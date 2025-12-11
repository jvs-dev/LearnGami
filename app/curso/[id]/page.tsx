'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getCourseById, getPublicCourseById } from '../../services/courseService';
import { getPublicLessons } from '../../services/lessonService';
import { useUser } from '../../UserContext';
import { Course, Lesson } from '../../types';
import './curso.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const { user, isAuthenticated } = useUser();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Check if user is admin to determine which endpoint to use
        const isAdmin = user?.role === 'ADMIN';
        let courseData;
        
        if (isAuthenticated && isAdmin) {
          // Admin users can access all course details
          courseData = await getCourseById(Number(courseId));
        } else {
          // Non-admin users should use the public endpoint
          courseData = await getPublicCourseById(Number(courseId));
        }
        
        setCourse(courseData);
        
        const lessonsData = await getPublicLessons(Number(courseId));
        setLessons(lessonsData);
        
        if (lessonsData.length > 0) {
          setActiveLesson(lessonsData[0]);
        }
      } catch (err) {
        setError('Erro ao carregar os dados do curso: ' + (err as Error).message);
        console.error('Error fetching course data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchData();
    }
  }, [courseId, user, isAuthenticated]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="course-detail">
          <div className="course-detail__container">
            <div className="course-detail__loading">
              Carregando detalhes do curso...
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="course-detail">
          <div className="course-detail__container">
            <div className="course-detail__error">
              {error}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <div className="course-detail">
          <div className="course-detail__container">
            <div className="course-detail__error">
              Curso não encontrado.
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="course-detail">
        <div className="course-detail__container">
          <div className="course-detail__header">
            <h1 className="course-detail__title">{course.title}</h1>
            <p className="course-detail__description">{course.description}</p>            
          </div>

          <div className="course-detail__content">
            {activeLesson ? (
              <div className="course-detail__video-section">
                <h2 className="course-detail__lesson-title">{activeLesson.name}</h2>
                <div className="course-detail__video-container">
                  <video 
                    src={activeLesson.videoUrl} 
                    controls 
                    className="course-detail__video"
                  />
                </div>
                <p className="course-detail__lesson-description">
                  {activeLesson.description}
                </p>
              </div>
            ) : (
              <div className="course-detail__no-lesson">
                <p>Selecione uma aula para começar a assistir.</p>
              </div>
            )}

            <div className="course-detail__lessons-section">
              <h3 className="course-detail__lessons-title">Aulas do Curso</h3>
              {lessons.length === 0 ? (
                <p className="course-detail__no-lessons">Este curso ainda não possui aulas.</p>
              ) : (
                <div className="course-detail__lessons-list">
                  {lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className={`course-detail__lesson-item ${
                        activeLesson?.id === lesson.id 
                          ? 'course-detail__lesson-item--active' 
                          : ''
                      }`}
                      onClick={() => setActiveLesson(lesson)}
                    >
                      <div className="course-detail__lesson-info">
                        <span className="course-detail__lesson-number">
                          {index + 1}.
                        </span>
                        <div className="course-detail__lesson-text">
                          <h4 className="course-detail__lesson-name">
                            {lesson.name}
                          </h4>
                          <p className="course-detail__lesson-desc">
                            {lesson.description.length > 60 
                              ? `${lesson.description.substring(0, 60)}...` 
                              : lesson.description}
                          </p>
                        </div>
                      </div>
                      {lesson.coverImage && (
                        <div className="course-detail__lesson-image">
                          <img 
                            src={lesson.coverImage} 
                            alt={lesson.name} 
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}