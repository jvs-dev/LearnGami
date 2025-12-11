"use client";

import React, { useState, useMemo, useEffect } from "react";
import CourseList from "./components/CourseList/CourseList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./page.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getPublicCourses } from "./services/courseService";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getPublicCourses();
        
        const transformedCourses: Course[] = data.map(course => ({
          id: course.id?.toString() || '',
          title: course.title,
          description: course.description,
          duration: `${course.duration} minutos`,
          imageUrl: course.imageUrl || '',
          status: 'active',
          createdAt: course.createdAt || new Date().toISOString()
        }));
        
        setCourses(transformedCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch courses");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, courses]);

  if (loading) {
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

            <div className="home__loading">
              Carregando cursos...
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
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

            <div className="home__error">
              Erro ao carregar cursos: {error}
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

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