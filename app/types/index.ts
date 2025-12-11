export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface Course {
  id: number; 
  title: string;
  description: string;
  duration: number;
  imageUrl?: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}

export interface Lesson {
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

export interface CreateCourseData {
  title: string;
  description: string;
  duration: number;
  imageUrl?: string;
  status?: boolean;
}

export interface CreateLessonData {
  name: string;
  description: string;
  coverImage?: string;
  videoUrl: string;
  courseId: number;
  status?: boolean;
}