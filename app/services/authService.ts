import { api } from './api';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}



import { getCookie, setCookie, deleteCookie } from '../utils/cookies';

export const fetchUserData = async (token: string) => {
  try {
    const { data, error } = await api.get('/auth/me', token);
    if (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    }
    return data.user as User;
  } catch (e) {
    console.error('Failed to fetch user data:', e);
    return null;
  }
};

export const fetchUserCount = async () => {
  try {
    const token = getCookie('token');

    if (!token) {
      throw new Error("Token não fornecido");
    }

    const { data, error } = await api.get('/auth/count', token);

    if (error) {
      throw new Error(error);
    }

    return data.count as number;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch user count");
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const { data, error } = await api.post('/auth/register', { name, email, password });

    if (error) {
      return { data: null, error };
    }

    if (data.token) {
      setCookie('token', data.token);
    }

    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await api.post('/auth/login', { email, password });

    if (error) {
      return { data: null, error };
    }

    if (data.token) {
      setCookie('token', data.token);
    }

    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

export const logout = () => {
  deleteCookie('token');
};

export const isAuthenticated = () => {
  const token = getCookie('token');
  return !!token;
};