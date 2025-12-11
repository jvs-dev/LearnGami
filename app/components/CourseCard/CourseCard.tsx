"use client";

import React from "react";
import Link from "next/link";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Course } from "../../types";
import "./CourseCard.css";


interface FlexibleCourse {
  id: number | string;
  title: string;
  description: string;
  duration: number | string;
  imageUrl?: string;
  status?: boolean | "active" | "inactive";
  createdAt?: string;
}

interface CourseCardProps {
  course: FlexibleCourse;
  variant?: "public" | "admin";
  onEdit?: (course: Course) => void;
  onDelete?: (id: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = "public",
  onEdit,
  onDelete,
}) => {
  const isNewCourse = () => {
    if (!course.createdAt) return false;
    const createdDate = new Date(course.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference <= 30;
  };

  const href = `/curso/${course.id}`;

  return (
    <div className="course-card">
      <Link href={href} className="course-card__link">
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
            {variant === "public" && isNewCourse() && (
              <span className="course-card__new-badge">Novo</span>
            )}
          </h3>
          
          <p className="course-card__description">
            {course.description.length > 100
              ? `${course.description.substring(0, 100)}...`
              : course.description}
          </p>

          <div className="course-card__info">
            <span className="course-card__duration">
              <i className="bi bi-clock"></i> Duração: {course.duration}
            </span>
            
            {variant === "admin" && course.status !== undefined && (
              <StatusBadge isActive={typeof course.status === 'boolean' ? course.status : course.status === 'active'} />
            )}
          </div>
        </div>
      </Link>

      {variant === "admin" && (
        <div className="course-card__actions">
          <button
            onClick={(e) => {
              e.preventDefault();              
              onEdit?.(course as unknown as Course);
            }}
            className="course-card__action-button course-card__action-button--edit"
          >
            Editar
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();            
              typeof course.id === 'number' && onDelete?.(course.id);
            }}
            className="course-card__action-button course-card__action-button--delete"
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;