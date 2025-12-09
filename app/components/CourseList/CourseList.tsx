'use client';

import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import './CourseList.css';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  createdAt: string; 
}

interface CourseListProps {
  courses: Course[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  title?: string;
}

const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  onEdit, 
  onDelete,
  title 
}) => {
  if (courses.length === 0) {
    return (
      <div className="course-list">
        {title && <h2 className="course-list__title">{title}</h2>}
        <p className="course-list__empty">
          Nenhum curso encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="course-list">
      {title && <h2 className="course-list__title">{title}</h2>}
      <div className="course-list__grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;