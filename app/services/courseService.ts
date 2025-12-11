import { api } from "./api";

const COURSES_ENDPOINT = "/courses";

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

// Course data interface
export interface Course {
  id?: number;
  title: string;
  description: string;
  duration: number;
  imageUrl?: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}

// Interface for course creation
export interface CreateCourseData {
  title: string;
  description: string;
  duration: number;
  imageUrl?: string;
  status?: boolean;
}

// Create a new course
export const createCourse = async (courseData: CreateCourseData): Promise<Course> => {
  try {
    // CORREÇÃO: Pegar do Cookie, não do localStorage
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.post(COURSES_ENDPOINT, courseData, token);
    
    if (error) {
      throw new Error(error);
    }
    
    return data.course || data; // Ajuste para garantir retorno correto
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create course");
  }
};

// Get all courses for the authenticated user
export const getUserCourses = async (): Promise<Course[]> => {
  try {
    // CORREÇÃO: Pegar do Cookie, não do localStorage
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.get(COURSES_ENDPOINT, token);
    
    if (error) {
      throw new Error(error);
    }
    
    return data as Course[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch courses");
  }
};

// Get a specific course by ID
export const getCourseById = async (id: number): Promise<Course> => {
  try {
    // CORREÇÃO: Pegar do Cookie, não do localStorage
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.get(`${COURSES_ENDPOINT}/${id}`, token);
    
    if (error) {
      throw new Error(error);
    }
    
    return data as Course;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch course");
  }
};

// Update a course
export const updateCourse = async (id: number, courseData: Partial<CreateCourseData>): Promise<Course> => {
  try {
    // CORREÇÃO: Pegar do Cookie, não do localStorage
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.put(`${COURSES_ENDPOINT}/${id}`, courseData, token);
    
    if (error) {
      throw new Error(error);
    }
    
    return data.course || data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update course");
  }
};

// Delete a course
export const deleteCourse = async (id: number): Promise<void> => {
  try {
    // CORREÇÃO: Pegar do Cookie, não do localStorage
    const token = getCookie('token');
    
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.delete(`${COURSES_ENDPOINT}/${id}`, token);
    
    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to delete course");
  }
};

// Get public courses
export const getPublicCourses = async (): Promise<Course[]> => {
  try {
    // Rota pública não precisa de token
    const { data, error } = await api.get(`${COURSES_ENDPOINT}/public`);
    
    if (error) {
      throw new Error(error);
    }
    
    return data as Course[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch public courses");
  }
};