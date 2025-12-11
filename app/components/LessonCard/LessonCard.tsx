'use client';

import React from 'react';
import './LessonCard.css';

interface Lesson {
  id?: number;
  name: string;
  description: string;
  coverImage?: string;
  videoUrl: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  courseId: number;
}

interface LessonCardProps {
  lesson: Lesson;
  courseTitle?: string;
  onEdit: (lesson: Lesson) => void;
  onDelete: (lessonId: number) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  courseTitle,
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="lesson-card">
      <div className="lesson-card__image-container">
        {lesson.coverImage ? (
          <img 
            src={lesson.coverImage} 
            alt={lesson.name} 
            className="lesson-card__image"
          />
        ) : (
          <div className="lesson-card__image-placeholder">
            <span className="lesson-card__image-placeholder-text">Sem imagem</span>
          </div>
        )}
      </div>
      
      <div className="lesson-card__content">
        <h3 className="lesson-card__title">{lesson.name}</h3>
        {courseTitle && (
          <p className="lesson-card__course">Curso: {courseTitle}</p>
        )}
        <p className="lesson-card__description">
          {lesson.description.length > 100 
            ? `${lesson.description.substring(0, 100)}...` 
            : lesson.description}
        </p>
        
        <div className="lesson-card__details">
          <span className={`lesson-card__status ${
            lesson.status 
              ? "lesson-card__status--active" 
              : "lesson-card__status--inactive"
          }`}>
            {lesson.status ? "Ativo" : "Inativo"}
          </span>
          {lesson.createdAt && (
            <span className="lesson-card__date">
              Criado em: {new Date(lesson.createdAt).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
      </div>
      
      <div className="lesson-card__actions">
        <button 
          className="lesson-card__action-button lesson-card__action-button--edit"
          onClick={() => onEdit(lesson)}
        >
          Editar
        </button>
        <button 
          className="lesson-card__action-button lesson-card__action-button--delete"
          onClick={() => lesson.id && onDelete(lesson.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default LessonCard;