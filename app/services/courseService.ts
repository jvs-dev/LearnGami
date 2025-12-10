import { api } from './api';

// Course interface
export interface Course {
  id: number;
  title: string;
  description: string;
  duration: number;
  imageUrl?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// Public course interface
export interface PublicCourse {
  id: number;
  title: string;
  description: string;
  duration: number;
  imageUrl?: string;
  createdAt: string;
  user: {
    name: string;
  };
}

// Create course response interface
export interface CreateCourseResponse {
  message: string;
  course: Course;
}

// Get courses response interface
export interface GetCoursesResponse extends Array<Course> {}

// Get public courses response interface
export interface GetPublicCoursesResponse extends Array<PublicCourse> {}

// Update course response interface
export interface UpdateCourseResponse {
  message: string;
  course: Course;
}

// Delete course response interface
export interface DeleteCourseResponse {
  message: string;
}

// Get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Create a new course
export const createCourse = async (courseData: Partial<Course>) => {
  const token = getToken();
  if (!token) {
    return { data: null, error: 'Não autenticado' };
  }

  try {
    const { data, error } = await api.post('/courses/', courseData, token);
    
    if (error) {
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

// Get all courses for authenticated user
export const getCourses = async () => {
  const token = getToken();
  if (!token) {
    return { data: null, error: 'Não autenticado' };
  }

  try {
    const { data, error } = await api.get('/courses/', token);
    
    if (error) {
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

// Get a specific course by ID
export const getCourseById = async (id: number) => {
  const token = getToken();
  if (!token) {
    return { data: null, error: 'Não autenticado' };
  }

  try {
    const { data, error } = await api.get(`/courses/${id}`, token);
    
    if (error) {
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

// Update a course by ID
export const updateCourse = async (id: number, courseData: Partial<Course>) => {
  const token = getToken();
  if (!token) {
    return { data: null, error: 'Não autenticado' };
  }

  try {
    const { data, error } = await api.put(`/courses/${id}`, courseData, token);
    
    if (error) {
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

// Delete a course by ID
export const deleteCourse = async (id: number) => {
  const token = getToken();
  if (!token) {
    return { data: null, error: 'Não autenticado' };
  }

  try {
    const { data, error } = await api.delete(`/courses/${id}`, token);
    
    if (error) {
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

// Get all public courses
export const getPublicCourses = async () => {
  try {
    const { data, error } = await api.get('/courses/public');
    
    if (error) {
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};