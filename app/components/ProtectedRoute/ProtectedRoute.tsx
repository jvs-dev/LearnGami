"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = "ADMIN",
}) => {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  // Começamos verificando para não exibir conteúdo protegido nem redirecionar errado antes da hora
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Função auxiliar para verificar cookie manualmente caso o contexto ainda esteja carregando
    const hasTokenCookie = () => {
      if (typeof document === "undefined") return false;
      return document.cookie
        .split(";")
        .some((item) => item.trim().startsWith("token="));
    };

    const checkAccess = () => {
      const hasCookie = hasTokenCookie();

      // 1. Se não tem cookie e o contexto diz que não está autenticado -> Login
      if (!hasCookie && !isAuthenticated) {
        console.log("ProtectedRoute: Sem token, redirecionando para login.");
        router.push("/login");
        return;
      }

      // 2. Se tem cookie, mas o contexto ainda não carregou o user -> Espera (retorna, o useEffect roda dnv quando user mudar)
      if (hasCookie && !user) {
        // Ainda estamos carregando os dados do usuário do backend...
        return;
      }

      // 3. Se usuário carregou, verificamos a Role
      if (requiredRole && user?.role !== requiredRole) {
        console.log(
          `ProtectedRoute: Role '${user?.role}' insuficiente. Exige '${requiredRole}'.`
        );
        router.push("/");
      } else {
        // 4. Tudo certo
        setIsVerifying(false);
      }
    };

    // Pequeno delay para garantir que a hidratação do Contexto ocorreu
    const timeout = setTimeout(checkAccess, 100);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, user, router, requiredRole]);

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#141414]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
