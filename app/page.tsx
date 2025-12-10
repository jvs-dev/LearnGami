"use client";

import React, { useState, useMemo } from "react";
import CourseList from "./components/CourseList/CourseList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./page.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

// Mock data
const mockCourses = [
  {
    id: "1",
    title: "Pássaro de papel",
    description:
      "Passaro de papél um pouco mais dificil que os convencionais.",
    duration: "3 Minutos",
    imageUrl: "https://images.pexels.com/photos/1272837/pexels-photo-1272837.jpeg",    
    status: "active" as const,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Borboleta de papel",
    description:
      "Borboleta de papél um pouco mais dificil que os convencionais.",
    duration: "2 Minutos",
    imageUrl: "https://images.pexels.com/photos/114977/pexels-photo-114977.jpeg",
    status: "active" as const,
    createdAt: "2023-05-16T14:45:00Z"
  },
  {
    id: "3",
    title: "Aula 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, fugiat atque necessitatibus voluptas voluptates facilis quas ipsa officiis incidunt similique culpa quaerat hic deserunt, repellendus nostrum aliquid reiciendis totam ad.",
    duration: "1 Minuto",
    imageUrl: "https://images.pexels.com/photos/1840756/pexels-photo-1840756.jpeg",
    status: "inactive" as const,
    createdAt: "2023-05-17T09:15:00Z"
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on search term and active status
  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => 
      course.status === "active" && 
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <>
      <Header />
      <div className="home">
        <main className="home__main">
          <section className="home__hero">
            <div className="home__hero-container container">
              <h1 className="home__hero-title">Bem-vindo ao LearnGami</h1>
              <p className="home__hero-subtitle">O melhor do origami esta aqui</p>
              <a href="#cursos" className="home__hero-button">
                Ver Cursos
              </a>
            </div>
          </section>

          <div className="home__search-container">
            <div className="home__search-wrapper">
              <input
                type="text"
                placeholder="Pesquisar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="home__search-input"
              />
              <i className="bi bi-search home__search-icon"></i>
            </div>
          </div>

          <CourseList
            courses={filteredCourses}
            title="Cursos Disponíveis"
          />
        </main>
      </div>
      <Footer />
    </>
  );
}