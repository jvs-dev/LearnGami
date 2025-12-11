import { api } from "./api";
import { Course, CreateCourseData } from "../types";

const COURSES_ENDPOINT = "/courses";

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

export const createCourse = async (courseData: CreateCourseData): Promise<Course> => {
  const token = getCookie('token');
  if (!token) throw new Error("Token não fornecido");

  const { data, error } = await api.post(COURSES_ENDPOINT, courseData, token);
  if (error) throw new Error(error);

  return data.course || data;
};

export const getUserCourses = async (): Promise<Course[]> => {
  const token = getCookie('token');
  if (!token) throw new Error("Token não fornecido");

  const { data, error } = await api.get(COURSES_ENDPOINT, token);
  if (error) throw new Error(error);

  return data as Course[];
};

export const getCourseById = async (id: number): Promise<Course> => {
  const token = getCookie('token');
  if (!token) throw new Error("Token não fornecido");

  const { data, error } = await api.get(`${COURSES_ENDPOINT}/${id}`, token);
  if (error) throw new Error(error);

  return data as Course;
};

export const updateCourse = async (id: number, courseData: Partial<CreateCourseData>): Promise<Course> => {
  const token = getCookie('token');
  if (!token) throw new Error("Token não fornecido");

  const { data, error } = await api.put(`${COURSES_ENDPOINT}/${id}`, courseData, token);
  if (error) throw new Error(error);

  return data.course || data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  const token = getCookie('token');
  if (!token) throw new Error("Token não fornecido");

  const { data, error } = await api.delete(`${COURSES_ENDPOINT}/${id}`, token);
  if (error) throw new Error(error);
};

export const getPublicCourses = async (): Promise<Course[]> => {
  const { data, error } = await api.get(`${COURSES_ENDPOINT}/public`);
  if (error) throw new Error(error);
  return data as Course[];
};