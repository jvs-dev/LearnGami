"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Modal from "../components/Modal/Modal";
import CourseForm from "../components/CourseForm/CourseForm";
import DashboardCourseCard from "../components/DashboardCourseCard/DashboardCourseCard";
import Pagination from "../components/Pagination/Pagination";
import {
  createCourse,
  getUserCourses,
  deleteCourse,
  updateCourse,
} from "../services/courseService";
import { fetchUserCount } from "../services/authService";
import "./dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Course {
  id?: number;
  title: string;
  description: string;
  duration: number;
  imageUrl?: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}

export default function DashboardPage() {
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [currentEditingCourse, setCurrentEditingCourse] =
    useState<Course | null>(null);

  const [courses, setCourses] = useState<Course[]>([]);
  const [userCount, setUserCount] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [userCountLoading, setUserCountLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userCountError, setUserCountError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await getUserCourses();
        setCourses(fetchedCourses);
      } catch (err) {
        setError("Erro ao carregar cursos: " + (err as Error).message);
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setUserCountLoading(true);
        const count = await fetchUserCount();
        setUserCount(count);
      } catch (err) {
        setUserCountError(
          "Erro ao carregar contagem de usuários: " + (err as Error).message
        );
        console.error("Error fetching user count:", err);
      } finally {
        setUserCountLoading(false);
      }
    };

    fetchCount();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (statusFilter === "all") return matchesSearch;
      if (statusFilter === "active") return matchesSearch && course.status;
      if (statusFilter === "inactive") return matchesSearch && !course.status;

      return matchesSearch;
    });
  }, [courses, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: "all" | "active" | "inactive") => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleCreateCourse = async (courseData: any) => {
    try {
      const createdCourse = await createCourse(courseData);
      setCourses((prev) => [...prev, createdCourse]);
      setIsCreateCourseModalOpen(false);
      alert("Curso criado com sucesso!");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Erro ao criar curso: " + (error as Error).message);
    }
  };

  const handleEditCourse = (course: Course) => {
    setCurrentEditingCourse(course);
    setIsEditCourseModalOpen(true);
  };

  const handleUpdateCourse = async (courseData: any) => {
    if (!currentEditingCourse || !currentEditingCourse.id) {
      alert("Erro: Nenhum curso selecionado para edição.");
      return;
    }

    try {
      const updatedCourse = await updateCourse(
        currentEditingCourse.id,
        courseData
      );

      setCourses((prev) =>
        prev.map((course) =>
          course.id === updatedCourse.id ? updatedCourse : course
        )
      );
      setIsEditCourseModalOpen(false);
      setCurrentEditingCourse(null);
      alert("Curso atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Erro ao atualizar curso: " + (error as Error).message);
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este curso?")) {
      return;
    }

    try {
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((course) => course.id !== courseId));

      if (currentCourses.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      alert("Curso excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Erro ao excluir curso: " + (error as Error).message);
    }
  };

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <Header />
      <div className="dashboard">
        <div className="dashboard__container">
          <h1 className="dashboard__title title">Painel de Administração</h1>
          <div className="dashboard__content">
            <div className="dashboard__card">
              <div className="dashboard__card-header">
                <h2 className="dashboard__card-title">
                  Bem-vindo, Administrador
                </h2>
              </div>
              <p className="dashboard__card-description">
                Gerencie seus cursos e aulas com facilidade.
              </p>
              <i className="bi bi-gear dashboard__card-icon"></i>
            </div>

            <div className="dashboard__actions">
              <button
                className="dashboard__action-button"
                onClick={() => setIsCreateCourseModalOpen(true)}
              >
                Criar Curso
              </button>
              <button className="dashboard__action-button">Criar Aula</button>
            </div>

            <div className="dashboard__stats">
              <div className="dashboard__stat-card">
                <h3 className="dashboard__stat-title">Cursos</h3>
                <p className="dashboard__stat-value">{courses.length}</p>
              </div>

              <div className="dashboard__stat-card">
                <h3 className="dashboard__stat-title">Usuários</h3>
                {userCountLoading ? (
                  <p className="dashboard__stat-value">...</p>
                ) : userCountError ? (
                  <p className="dashboard__stat-value text-red-500">-</p>
                ) : (
                  <p className="dashboard__stat-value">{userCount}</p>
                )}
              </div>

              <div className="dashboard__stat-card">
                <h3 className="dashboard__stat-title">Aulas</h3>
                <p className="dashboard__stat-value">0</p>
              </div>
            </div>

            <div className="dashboard__sections">
              <div className="dashboard__section">
                <h2 className="dashboard__section-title">Gerenciar Cursos</h2>
                <p className="dashboard__section-description">
                  Lista de todos os cursos cadastrados no sistema com opções
                  para editar ou excluir.
                </p>

                <div className="dashboard__controls">
                  <div className="dashboard__search-container">
                    <div className="dashboard__search-wrapper">
                      <input
                        type="text"
                        placeholder="Pesquisar cursos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="dashboard__search-input"
                      />
                      <i className="bi bi-search dashboard__search-icon"></i>
                    </div>
                  </div>

                  <div className="dashboard__filter-buttons">
                    {(["all", "active", "inactive"] as const).map((filter) => (
                      <button
                        key={filter}
                        className={`dashboard__filter-button ${
                          statusFilter === filter
                            ? "dashboard__filter-button--active"
                            : ""
                        }`}
                        onClick={() => handleFilterChange(filter)}
                      >
                        {filter === "all"
                          ? "Todos"
                          : filter === "active"
                          ? "Ativos"
                          : "Inativos"}
                      </button>
                    ))}
                  </div>
                </div>

                {loading ? (
                  <p className="dashboard__loading-message">
                    Carregando cursos...
                  </p>
                ) : error ? (
                  <p className="dashboard__error-message">{error}</p>
                ) : currentCourses.length === 0 ? (
                  <p className="dashboard__empty-message">
                    Nenhum curso encontrado.
                  </p>
                ) : (
                  <>
                    <div className="dashboard__courses-grid">
                      {currentCourses.map((course) => (
                        <DashboardCourseCard
                          key={course.id}
                          course={course}
                          onEdit={handleEditCourse}
                          onDelete={handleDeleteCourse}
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </div>

              <div className="dashboard__section">
                <h2 className="dashboard__section-title">Gerenciar Aulas</h2>
                <p className="dashboard__section-description">
                  Lista de todas as aulas cadastradas no sistema com opções para
                  editar ou excluir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateCourseModalOpen}
        onClose={() => setIsCreateCourseModalOpen(false)}
        title="Criar Novo Curso"
      >
        <CourseForm
          onSubmit={handleCreateCourse}
          onCancel={() => setIsCreateCourseModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditCourseModalOpen}
        onClose={() => {
          setIsEditCourseModalOpen(false);
          setCurrentEditingCourse(null);
        }}
        title="Editar Curso"
      >
        {currentEditingCourse && (
          <CourseForm
            initialData={{
              title: currentEditingCourse.title,
              description: currentEditingCourse.description,
              duration: currentEditingCourse.duration,
              imageUrl: currentEditingCourse.imageUrl,
              status: currentEditingCourse.status,
            }}
            onSubmit={handleUpdateCourse}
            onCancel={() => {
              setIsEditCourseModalOpen(false);
              setCurrentEditingCourse(null);
            }}
          />
        )}
      </Modal>

      <Footer />
    </ProtectedRoute>
  );
}
