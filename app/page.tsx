"use client";

import React, { useState, useMemo, useEffect } from "react";
import CourseList from "./components/CourseList/CourseList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import "./page.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getPublicCourses } from "./services/courseService";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  status: "active" | "inactive";
  createdAt: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getPublicCourses();

        const transformedCourses: Course[] = data.map((course) => ({
          id: course.id?.toString() || "",
          title: course.title,
          description: course.description,
          duration: `${course.duration} minutos`,
          imageUrl: course.imageUrl || "",
          status: "active",
          createdAt: course.createdAt || new Date().toISOString(),
        }));

        setCourses(transformedCourses);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch courses"
        );
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, courses]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const listElement = document.getElementById("cursos-lista");
    if (listElement) listElement.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <div className="home">
        <main className="home__main">
          <section className="home__hero">
            <div className="home__hero-container container">
              <h1 className="home__hero-title">Bem-vindo ao LearnGami</h1>
              <p className="home__hero-subtitle">
                O melhor do origami está aqui
              </p>
              <a href="#cursos-lista" className="home__hero-button">
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
                onChange={handleSearchChange}
                className="home__search-input"
              />
              <i className="bi bi-search home__search-icon"></i>
            </div>
          </div>

          <div id="cursos-lista">
            {loading && (
              <div className="home__loading">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p>Carregando cursos...</p>
              </div>
            )}

            {error && (
              <div className="home__error">
                <i className="bi bi-exclamation-triangle"></i>
                <p>Erro ao carregar cursos: {error}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                {filteredCourses.length > 0 ? (
                  <>
                    <CourseList
                      courses={currentCourses}
                      title={
                        searchTerm
                          ? `Resultados para "${searchTerm}"`
                          : "Cursos Disponíveis"
                      }
                    />

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <div className="home__empty">
                    <p>Nenhum curso encontrado com esse termo.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
