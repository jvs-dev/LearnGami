"use client";

import React from "react";
import "./DashboardCourseCard.css";

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

interface DashboardCourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (courseId: number) => void;
}

const DashboardCourseCard: React.FC<DashboardCourseCardProps> = ({ 
  course, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="dashboard-course-card">
      <div className="dashboard-course-card__image-container">
        {course.imageUrl ? (
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="dashboard-course-card__image"
          />
        ) : (
          <div className="dashboard-course-card__image-placeholder">
            <span className="dashboard-course-card__image-text">Sem imagem</span>
          </div>
        )}
      </div>
      
      <div className="dashboard-course-card__content">
        <h3 className="dashboard-course-card__title">{course.title}</h3>
        <p className="dashboard-course-card__description">
          {course.description.length > 100 
            ? `${course.description.substring(0, 100)}...` 
            : course.description}
        </p>
        
        <div className="dashboard-course-card__details">
          <span className="dashboard-course-card__duration">
            Duração: {course.duration} min
          </span>
          <span className={`dashboard-course-card__status ${
            course.status 
              ? "dashboard-course-card__status--active" 
              : "dashboard-course-card__status--inactive"
          }`}>
            {course.status ? "Ativo" : "Inativo"}
          </span>
        </div>
      </div>
      
      <div className="dashboard-course-card__actions">
        <button 
          className="dashboard-course-card__action-button dashboard-course-card__action-button--edit"
          onClick={() => onEdit(course)}
        >
          Editar
        </button>
        <button 
          className="dashboard-course-card__action-button dashboard-course-card__action-button--delete"
          onClick={() => course.id && onDelete(course.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default DashboardCourseCard;