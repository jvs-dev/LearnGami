"use client";

import React from "react";
import "./CourseCard.css";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  status: "active" | "inactive";
  createdAt: string;
}

interface CourseCardProps {
  course: Course;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEdit,
  onDelete,
}) => {
  const formattedDate = new Date(course.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const isNewCourse = () => {
    const createdDate = new Date(course.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference <= 30;
  };

  return (
    <div className="course-card">
      <div className="course-card__image-container">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title}
            className="course-card__image"
          />
        ) : (
          <div className="course-card__image-placeholder">
            <span className="course-card__image-placeholder-text">
              Sem imagem
            </span>
          </div>
        )}
      </div>

      <div className="course-card__content">
        <h3 className="course-card__title">
          {course.title}
          {isNewCourse() && (
            <span className="course-card__new-badge">Novo</span>
          )}
        </h3>
        <p className="course-card__description">{course.description}</p>

        <div className="course-card__info">
          <span className="course-card__duration">
            Duração: {course.duration}
          </span>
        </div>        

        {(onEdit || onDelete) && (
          <div className="course-card__actions">
            {onEdit && (
              <button
                onClick={() => onEdit(course.id)}
                className="course-card__action-button course-card__action-button--edit"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(course.id)}
                className="course-card__action-button course-card__action-button--delete"
              >
                Excluir
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
