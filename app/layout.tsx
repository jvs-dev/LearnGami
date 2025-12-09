import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "./functions/fonts";

export const metadata: Metadata = {
  title: "LearnGami - Aprenda origami",
  description: "Plataforma de cursos de Origami",
  keywords: "origami, aprenda origami, plataforma de origami",
  authors: [{ name: "LearnGami" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>{children}</body>
    </html>
  );
}
