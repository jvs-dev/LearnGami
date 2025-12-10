import { api } from './api';

// User interface
export interface User {
  id: number;
  email: string;
  name: string;
}

// Register response interface
export interface RegisterResponse {
  message: string;
  token: string;
  user: User;
}

// Login response interface
export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

// Register function
export const register = async (name: string, email: string, password: string) => {
  try {
    const { data, error } = await api.post('/auth/register', { name, email, password });
    
    if (error) {
      return { data: null, error };
    }
    
    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

// Login function
export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await api.post('/auth/login', { email, password });
    
    if (error) {
      return { data: null, error };
    }
    
    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { data: null, error: errorMessage };
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};