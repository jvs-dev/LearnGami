import type { Metadata } from "next";
import "./globals.css";
import "./styles/theme.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../app/components/ProtectedRoute/ProtectedRoute.css";
import "../app/components/Modal/Modal.css";
import { type_second } from "./utils/fonts";
import { UserProvider } from "./UserContext";

export const metadata: Metadata = {
  title: "LearnGami - Aprenda Origami",
  description: "Plataforma completa para aprender origami",
  keywords:
    "origami, aprendizagem, educação, plataforma, aprenda, origami, passo a passo, tutoriais, projetos, manualidades, criatividade, relaxamento, mente, corpo, espírito, cultura, história, técnica, prática, competência, autoconfiança, realização, satisfação, bem-estar, saúde, mente, corpo, espírito, aprendizado, crescimento, desenvolvimento, conhecimento, inteligência, habilidade, profissionalismo, sucesso, realização, satisfação, bem-estar, saúde, mente, corpo, espírito, aprendizado, crescimento, desenvolvimento, conhecimento, inteligência, habilidade, sucesso",
  authors: [{ name: "LearnGami" }],
  icons: [
    {
      rel: "icon",
      url: "/favicon.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>
        <UserProvider>
          <div className="app__container">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}