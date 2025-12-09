"use client";

import CourseList from "./components/CourseList/CourseList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./page.css";

// Mock data for demonstration
const mockCourses = [
  {
    id: "1",
    title: "Pássaro de papel",
    description:
      "Passaro de papél um pouco mais dificil que os convencionais.",
    duration: "3 Minutos",
    imageUrl: "https://images.pexels.com/photos/1272837/pexels-photo-1272837.jpeg",    
    status: "active" as const,
    createdAt: new Date().toISOString() // Setting to current date to show as "Novo"
  },
  {
    id: "2",
    title: "Borboleta de papel",
    description:
      "Borboleta de papél um pouco mais dificil que os convencionais.",
    duration: "2 Minutos",
    imageUrl: "https://images.pexels.com/photos/114977/pexels-photo-114977.jpeg",
    status: "active" as const,
    createdAt: "2023-05-16T14:45:00Z" // Adding creation date
  },
  {
    id: "3",
    title: "Aula 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, fugiat atque necessitatibus voluptas voluptates facilis quas ipsa officiis incidunt similique culpa quaerat hic deserunt, repellendus nostrum aliquid reiciendis totam ad.",
    duration: "1 Minuto",
    imageUrl: "https://images.pexels.com/photos/1840756/pexels-photo-1840756.jpeg",
    status: "inactive" as const,
    createdAt: "2023-05-17T09:15:00Z" // Adding creation date
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
