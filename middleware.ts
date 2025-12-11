import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/conta'];
const adminRoutes = ['/dashboard'];

function parseJwt(token: string) {
   try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
   } catch (error) {
      console.error("Erro ao fazer parse do JWT:", error);
      return null;
   }
}

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;

   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
   const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

   if (isProtectedRoute || isAdminRoute) {
      let token = null;
      const authHeader = request.headers.get('authorization');

      if (authHeader && authHeader.startsWith('Bearer ')) {
         token = authHeader.substring(7);
      }

      if (!token) {
         token = request.cookies.get('token')?.value;
      }

      if (!token) {
         console.log(`[Middleware] Sem token acessando ${pathname}. Redirecionando para login.`);
         const url = new URL('/login', request.url);
         return NextResponse.redirect(url);
      }

      const payload = parseJwt(token);

      if (!payload) {
         console.log(`[Middleware] Token inválido acessando ${pathname}.`);
         const url = new URL('/login', request.url);
         return NextResponse.redirect(url);
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
         console.log(`[Middleware] Token expirado.`);
         const url = new URL('/login', request.url);
         return NextResponse.redirect(url);
      }

      if (isAdminRoute) {
         const role = payload.role || (payload.user && payload.user.role) || 'USER';

         console.log("Role detectada:", role);

         if (role !== 'ADMIN') {
            console.log(`[Middleware] Acesso negado. Role '${role}' não é ADMIN. Redirecionando.`);
            const url = new URL('/', request.url);
            return NextResponse.redirect(url);
         }
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
   ],
};