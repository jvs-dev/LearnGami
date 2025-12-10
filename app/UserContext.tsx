"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { isAuthenticated as checkAuth } from "./services/authService";
import { api } from "./services/api";

// Define the shape of our user data
interface User {
  id: number;
  email: string;
  name: string;
  role: string; // Add role property
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Function to fetch user data from the backend
const fetchUserData = async (token: string) => {
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

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuthentication = async () => {
      const authStatus = checkAuth();
      setIsAuthenticated(authStatus);
      
      // If authenticated, fetch user data from the backend
      if (authStatus) {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await fetchUserData(token);
          if (userData) {
            setUser(userData);
          } else {
            // If we can't fetch user data, logout the user
            setIsAuthenticated(false);
            localStorage.removeItem('token');
          }
        }
      }
    };

    checkAuthentication();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};