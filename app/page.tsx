"use client";

import CourseList from "./components/CourseList/CourseList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./page.css";

// Mock data for demonstration
const mockCourses = [
  {
    id: "1",
    title: "Introdução ao React",
    description:
      "Aprenda os fundamentos do React e comece a construir aplicações web modernas.",
    duration: "8 horas",
    imageUrl: "",
    status: "active" as const,
  },
  {
    id: "2",
    title: "Next.js Completo",
    description:
      "Domine o Next.js e crie aplicações web performáticas e escaláveis.",
    duration: "12 horas",
    imageUrl: "",
    status: "active" as const,
  },
  {
    id: "3",
    title: "TypeScript Avançado",
    description:
      "Aprofunde seus conhecimentos em TypeScript e escreva código mais seguro.",
    duration: "10 horas",
    imageUrl: "",
    status: "inactive" as const,
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <div className="app">
        <main className="main">
          <section className="hero">
            <div className="hero__container container">
              <h1 className="hero__title">Bem-vindo ao LearnGami</h1>
              <p className="hero__subtitle">
                O melhor do origami esta aqui
              </p>
              <a href="#cursos" className="hero__button">
                Ver Cursos
              </a>
            </div>
          </section>

          <CourseList
            courses={mockCourses.filter((course) => course.status === "active")}
            title="Cursos Disponíveis"
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
