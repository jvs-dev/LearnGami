"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Modal from "../components/Modal/Modal";
import CourseForm from "../components/CourseForm/CourseForm";
import DashboardCourseCard from "../components/DashboardCourseCard/DashboardCourseCard";
import { createCourse, getUserCourses, deleteCourse, updateCourse } from "../services/courseService";
import "./dashboard.css";

// Define the Course interface locally to avoid circular dependencies
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
  const [currentEditingCourse, setCurrentEditingCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses when the component mounts
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

  const handleCreateCourse = async (courseData: any) => {
    try {
      const createdCourse = await createCourse(courseData);
      console.log("Created course:", createdCourse);
      
      // Add the new course to the list
      setCourses(prev => [...prev, createdCourse]);
      
      // Close the modal after submission
      setIsCreateCourseModalOpen(false);
      
      // Show success message
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
      const updatedCourse = await updateCourse(currentEditingCourse.id, courseData);
      console.log("Updated course:", updatedCourse);
      
      // Update the course in the list
      setCourses(prev => 
        prev.map(course => 
          course.id === updatedCourse.id ? updatedCourse : course
        )
      );
      
      // Close the modal after submission
      setIsEditCourseModalOpen(false);
      setCurrentEditingCourse(null);
      
      // Show success message
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
      
      // Remove the course from the list
      setCourses(prev => prev.filter(course => course.id !== courseId));
      
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
          <h1 className="dashboard__title">Painel de Administração</h1>
          <div className="dashboard__content">
            <div className="dashboard__card">
              <h2 className="dashboard__card-title">Bem-vindo ao Painel de Administração</h2>
              <p className="dashboard__card-description">
                Você está no painel de administração. Aqui você pode gerenciar cursos, usuários e outras configurações do sistema.
              </p>
            </div>
            
            <div className="dashboard__actions">
              <button 
                className="dashboard__action-button"
                onClick={() => setIsCreateCourseModalOpen(true)}
              >
                Criar Curso
              </button>
              <button className="dashboard__action-button">
                Criar Aula
              </button>
            </div>
            
            <div className="dashboard__stats">
              <div className="dashboard__stat-card">
                <h3 className="dashboard__stat-title">Cursos</h3>
                <p className="dashboard__stat-value">{courses.length}</p>
              </div>
              
              <div className="dashboard__stat-card">
                <h3 className="dashboard__stat-title">Usuários</h3>
                <p className="dashboard__stat-value">0</p>
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
                  Lista de todos os cursos cadastrados no sistema com opções para editar ou excluir.
                </p>
                
                {loading ? (
                  <p className="dashboard__loading-message">Carregando cursos...</p>
                ) : error ? (
                  <p className="dashboard__error-message">{error}</p>
                ) : courses.length === 0 ? (
                  <p className="dashboard__empty-message">Nenhum curso encontrado.</p>
                ) : (
                  <div className="dashboard__courses-grid">
                    {courses.map(course => (
                      <DashboardCourseCard
                        key={course.id}
                        course={course}
                        onEdit={handleEditCourse}
                        onDelete={handleDeleteCourse}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="dashboard__section">
                <h2 className="dashboard__section-title">Gerenciar Aulas</h2>
                <p className="dashboard__section-description">
                  Lista de todas as aulas cadastradas no sistema com opções para editar ou excluir.
                </p>
                {/* Lesson list will be implemented here */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Course Modal */}
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
      
      {/* Edit Course Modal */}
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
              status: currentEditingCourse.status
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