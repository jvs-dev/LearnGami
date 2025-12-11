import { api } from "./api";

const LESSONS_ENDPOINT = "/lessons";

// Helper para ler cookies (O mesmo usado no authService/api)
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
}

// Lesson data interface
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

// Interface for lesson creation
export interface CreateLessonData {
  name: string;
  description: string;
  coverImage?: string;
  videoUrl: string;
  courseId: number;
  status?: boolean;
}

// Create a new lesson
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

// Get all lessons for a specific course
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

// Get a specific lesson by ID
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

// Update a lesson
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

// Delete a lesson
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

// Get public lessons for a course
export const getPublicLessons = async (courseId: number): Promise<Lesson[]> => {
  try {
    // Rota pública não precisa de token
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