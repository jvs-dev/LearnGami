"use client";

import CourseList from "./components/CourseList/CourseList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./page.css";

// Mock data for demonstration
const mockCourses = [
  {
    id: "1",
    title: "Aula 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, fugiat atque necessitatibus voluptas voluptates facilis quas ipsa officiis incidunt similique culpa quaerat hic deserunt, repellendus nostrum aliquid reiciendis totam ad.",
    duration: "8 horas",
    imageUrl: "",
    status: "active" as const,
  },
  {
    id: "2",
    title: "Aula 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, fugiat atque necessitatibus voluptas voluptates facilis quas ipsa officiis incidunt similique culpa quaerat hic deserunt, repellendus nostrum aliquid reiciendis totam ad.",
    duration: "12 horas",
    imageUrl: "",
    status: "active" as const,
  },
  {
    id: "3",
    title: "Aula 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, fugiat atque necessitatibus voluptas voluptates facilis quas ipsa officiis incidunt similique culpa quaerat hic deserunt, repellendus nostrum aliquid reiciendis totam ad.",
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
              <p className="hero__subtitle">O melhor do origami esta aqui</p>
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
