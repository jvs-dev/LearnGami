import { api } from './api';


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


export interface CreateCourseResponse {
  message: string;
  course: Course;
}


export interface GetCoursesResponse extends Array<Course> { }


export interface GetPublicCoursesResponse extends Array<PublicCourse> { }


export interface UpdateCourseResponse {
  message: string;
  course: Course;
}


export interface DeleteCourseResponse {
  message: string;
}


const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};


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