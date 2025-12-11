import { api } from "./api";
import { getCookie } from '../utils/cookies';

const LESSONS_ENDPOINT = "/lessons";

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

export interface CreateLessonData {
  name: string;
  description: string;
  coverImage?: string;
  videoUrl: string;
  courseId: number;
  status?: boolean;
}

export const createLesson = async (lessonData: CreateLessonData): Promise<Lesson> => {
  try {
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.post(LESSONS_ENDPOINT, lessonData, token);
    
    if (error) {
      throw new Error(error);
    }
    
    return data.lesson || data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create lesson");
  }
};

export const getLessonsByCourse = async (courseId: number): Promise<Lesson[]> => {
  try {
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.get(`${LESSONS_ENDPOINT}/course/${courseId}`, token);
    
    if (error) {
      throw new Error(error);
    }
    
    return data as Lesson[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch lessons");
  }
};

export const getLessonById = async (id: number): Promise<Lesson> => {
  try {
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.get(`${LESSONS_ENDPOINT}/${id}`, token);
    
    if (error) {
      throw new Error(error);
    }
    
    return data as Lesson;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch lesson");
  }
};

export const updateLesson = async (id: number, lessonData: Partial<CreateLessonData>): Promise<Lesson> => {
  try {
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.put(`${LESSONS_ENDPOINT}/${id}`, lessonData, token);
    
    if (error) {
      throw new Error(error);
    }
    
    return data.lesson || data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update lesson");
  }
};

export const deleteLesson = async (id: number): Promise<void> => {
  try {
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.delete(`${LESSONS_ENDPOINT}/${id}`, token);
    
    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to delete lesson");
  }
};

export const getPublicLessons = async (courseId: number): Promise<Lesson[]> => {
  try {
    const { data, error } = await api.get(`${LESSONS_ENDPOINT}/public/course/${courseId}`);
    
    if (error) {
      throw new Error(error);
    }
    
    return data as Lesson[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch public lessons");
  }
};