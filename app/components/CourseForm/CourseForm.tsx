"use client";

import React, { useState } from "react";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import { CreateCourseData } from "../../types";
import "./CourseForm.css";

interface CourseFormProps {
  onSubmit: (data: CreateCourseData) => void;
  onCancel: () => void;
  initialData?: Partial<CreateCourseData>;
}

const CourseForm: React.FC<CourseFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    duration: initialData.duration || 0,
    imageUrl: initialData.imageUrl || "",
    status: initialData.status !== undefined ? initialData.status : true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit({
      ...formData,
      duration: Number(formData.duration),
    });
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <Input
        id="title"
        label="Título *"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Descrição *
        </label>
        <textarea
          id="description"
          className="form-input form-textarea"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <Input
        id="duration"
        label="Duração (min) *"
        type="number"
        value={formData.duration.toString()}
        onChange={handleChange}
        required
        min={1}
      />

      <div className="form-group">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          className="form-input"
          value={formData.status ? "true" : "false"}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              status: e.target.value === "true",
            }))
          }
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </div>

      <Input
        id="imageUrl"
        label="URL da Imagem de Capa"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="https://..."
      />

      <div className="course-form__actions">
        <Button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Salvar Curso
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
