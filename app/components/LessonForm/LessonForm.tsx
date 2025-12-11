'use client';

import React, { useState, useEffect, useMemo } from 'react';
import './LessonForm.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface LessonFormData {
  name: string;
  description: string;
  coverImage: string;
  videoUrl: string;
  status: boolean;
  courseId: number;
}

interface CourseOption {
  id: number;
  title: string;
  imageUrl?: string;
}

interface LessonFormProps {
  initialData?: Partial<LessonFormData>;
  onSubmit: (data: LessonFormData) => void;
  onCancel: () => void;
  courses: CourseOption[];
}

const LessonForm: React.FC<LessonFormProps> = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel,
  courses
}) => {
  const [formData, setFormData] = useState<LessonFormData>({
    name: '',
    description: '',
    coverImage: '',
    videoUrl: '',
    status: true,
    courseId: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  // Initialize form data only once when component mounts
  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      description: initialData.description || '',
      coverImage: initialData.coverImage || '',
      videoUrl: initialData.videoUrl || '',
      status: initialData.status !== undefined ? initialData.status : true,
      courseId: initialData.courseId || 0
    });
  }, []); // Empty dependency array - only run once on mount

  // Filter and paginate courses
  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCourseSelect = (courseId: number) => {
    setFormData(prev => ({
      ...prev,
      courseId
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome da aula é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!formData.videoUrl.trim()) {
      newErrors.videoUrl = 'URL do vídeo é obrigatória';
    }
    
    if (formData.courseId === 0) {
      newErrors.courseId = 'Selecione um curso';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Render pagination controls
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
      <div className="lesson-form__pagination">
        <button 
          className="lesson-form__pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        
        {startPage > 1 && (
          <>
            <button 
              className={`lesson-form__pagination-number ${currentPage === 1 ? 'lesson-form__pagination-number--active' : ''}`}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="lesson-form__pagination-ellipsis">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`lesson-form__pagination-number ${currentPage === number ? 'lesson-form__pagination-number--active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="lesson-form__pagination-ellipsis">...</span>}
            <button 
              className={`lesson-form__pagination-number ${currentPage === totalPages ? 'lesson-form__pagination-number--active' : ''}`}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button 
          className="lesson-form__pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <form className="lesson-form" onSubmit={handleSubmit}>
      <div className="lesson-form__group">
        <label htmlFor="name" className="lesson-form__label">
          Nome da Aula *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`lesson-form__input ${errors.name ? 'lesson-form__input--error' : ''}`}
          placeholder="Digite o nome da aula"
        />
        {errors.name && <span className="lesson-form__error">{errors.name}</span>}
      </div>

      <div className="lesson-form__group">
        <label htmlFor="description" className="lesson-form__label">
          Descrição *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`lesson-form__textarea ${errors.description ? 'lesson-form__input--error' : ''}`}
          placeholder="Digite a descrição da aula"
          rows={4}
        />
        {errors.description && <span className="lesson-form__error">{errors.description}</span>}
      </div>

      <div className="lesson-form__group">
        <label htmlFor="coverImage" className="lesson-form__label">
          Imagem de Capa (URL)
        </label>
        <input
          type="text"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          className="lesson-form__input"
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div className="lesson-form__group">
        <label htmlFor="videoUrl" className="lesson-form__label">
          URL do Vídeo *
        </label>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className={`lesson-form__input ${errors.videoUrl ? 'lesson-form__input--error' : ''}`}
          placeholder="https://exemplo.com/video.mp4"
        />
        {errors.videoUrl && <span className="lesson-form__error">{errors.videoUrl}</span>}
      </div>

      <div className="lesson-form__group">
        <label className="lesson-form__label">
          Selecione o Curso *
        </label>
        
        {/* Search Bar with Icon */}
        <div className="lesson-form__search-container">
          <div className="lesson-form__search-wrapper">
            <input
              type="text"
              placeholder="Pesquisar cursos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="lesson-form__search-input"
            />
            <i className="bi bi-search lesson-form__search-icon"></i>
          </div>
        </div>
        
        {/* Course Selection Cards */}
        <div className="lesson-form__course-cards">
          {currentCourses.length > 0 ? (
            currentCourses.map(course => (
              <div
                key={course.id}
                className={`lesson-form__course-card ${
                  formData.courseId === course.id 
                    ? 'lesson-form__course-card--selected' 
                    : ''
                }`}
                onClick={() => handleCourseSelect(course.id)}
              >
                <div className="lesson-form__course-image">
                  {course.imageUrl ? (
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="lesson-form__course-image-img"
                      onError={(e) => {
                        // Handle image loading errors
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('lesson-form__course-image-placeholder--hidden');
                      }}
                    />
                  ) : null}
                  <div className={`lesson-form__course-image-placeholder ${
                    course.imageUrl ? 'lesson-form__course-image-placeholder--hidden' : ''
                  }`}>
                    <i className="bi bi-book lesson-form__course-image-icon"></i>
                    <span>Sem imagem</span>
                  </div>
                </div>
                <div className="lesson-form__course-info">
                  <h3 className="lesson-form__course-title">{course.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="lesson-form__no-courses">
              Nenhum curso encontrado.
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {renderPagination()}
        
        {errors.courseId && <span className="lesson-form__error">{errors.courseId}</span>}
      </div>

      <div className="lesson-form__group lesson-form__group--checkbox">
        <label className="lesson-form__checkbox-label">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="lesson-form__checkbox"
          />
          <span className="lesson-form__checkbox-text">
            Aula Ativa
          </span>
        </label>
      </div>

      <div className="lesson-form__actions">
        <button type="button" className="lesson-form__button lesson-form__button--cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="lesson-form__button lesson-form__button--submit">
          {initialData.name ? 'Atualizar Aula' : 'Criar Aula'}
        </button>
      </div>
    </form>
  );
};

export default LessonForm;