"use client";

import React, { useState } from "react";
import "./CourseForm.css";

interface CourseFormProps {
  onSubmit: (courseData: any) => void;
  onCancel: () => void;
  initialData?: {
    title?: string;
    description?: string;
    duration?: number;
    imageUrl?: string;
    status?: boolean;
  };
}

const CourseForm = ({ 
  onSubmit, 
  onCancel,
  initialData = {} 
}: CourseFormProps) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [duration, setDuration] = useState<number>(initialData.duration || 0);
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");
  const [status, setStatus] = useState<boolean>(initialData.status !== undefined ? initialData.status : true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const courseData = {
      title,
      description,
      duration: Number(duration),
      imageUrl,
      status,      
    };
    
    onSubmit(courseData);
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <div className="course-form__group">
        <label htmlFor="title" className="course-form__label">
          Título *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="course-form__input"
          required
        />
      </div>

      <div className="course-form__group">
        <label htmlFor="description" className="course-form__label">
          Descrição *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="course-form__textarea"
          rows={4}
          required
        />
      </div>

      <div className="course-form__group">
        <label htmlFor="duration" className="course-form__label">
          Duração (minutos) *
        </label>
        <input
          id="duration"
          type="number"
          value={duration || ""}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="course-form__input"
          placeholder="Ex: 30"
          min="1"
          required
        />
      </div>

      <div className="course-form__group">
        <label htmlFor="imageUrl" className="course-form__label">
          URL da Imagem
        </label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="course-form__input"
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div className="course-form__group">
        <label htmlFor="status" className="course-form__label">
          Status
        </label>
        <select
          id="status"
          value={status ? "active" : "inactive"}
          onChange={(e) => setStatus(e.target.value === "active")}
          className="course-form__select"
        >
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
      </div>

      <div className="course-form__actions">
        <button
          type="button"
          onClick={onCancel}
          className="course-form__button course-form__button--cancel"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="course-form__button course-form__button--submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Salvar Curso"}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;