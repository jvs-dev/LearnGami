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
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="home__pagination">
        <button 
          className="home__pagination-button"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        
        {startPage > 1 && (
          <>
            <button 
              className={`home__pagination-number ${currentPage === 1 ? 'home__pagination-number--active' : ''}`}
              onClick={() => goToPage(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="home__pagination-ellipsis">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`home__pagination-number ${currentPage === number ? 'home__pagination-number--active' : ''}`}
            onClick={() => goToPage(number)}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="home__pagination-ellipsis">...</span>}
            <button 
              className={`home__pagination-number ${currentPage === totalPages ? 'home__pagination-number--active' : ''}`}
              onClick={() => goToPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button 
          className="home__pagination-button"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    );
  };

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
            courses={currentCourses}
            title={`Cursos Disponíveis (${filteredCourses.length})`}
          />
          
          {renderPagination()}
        </main>
      </div>
      <Footer />
    </>
  );
}