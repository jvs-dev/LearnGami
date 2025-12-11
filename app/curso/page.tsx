'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useUser } from '../UserContext';
import { getPublicCourses } from '../services/courseService';
import CourseList from '../components/CourseList/CourseList';
import Pagination from '../components/Pagination/Pagination';
import '../page.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface TransformedCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  status: "active" | "inactive";
  createdAt: string;
}

export default function CoursesPage() {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const [courses, setCourses] = useState<TransformedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Redirect unauthenticated users to login page
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getPublicCourses();

        const transformedCourses: TransformedCourse[] = data.map((course) => ({
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
          err instanceof Error ? err.message : 'Failed to fetch courses'
        );
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCourses();
    }
  }, [isAuthenticated]);

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

  if (!isAuthenticated) {
    return null; // Will be redirected to login page
  }

  return (
    <>
      <Header />
      <div className="home">
        <main className="home__main">
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
                          : "Meus Cursos"
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
                    <p>Nenhum curso encontrado.</p>
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