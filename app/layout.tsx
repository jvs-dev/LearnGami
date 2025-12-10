import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "./functions/fonts";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export const metadata: Metadata = {
  title: "CourseManager - Sistema de Gestão de Cursos",
  description: "Plataforma completa para gerenciamento de cursos",
  keywords: "cursos, gerenciamento, educação, plataforma",
  authors: [{ name: "CourseManager" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>        
        <div className="app__container">{children}</div>        
      </body>
    </html>
  );
}