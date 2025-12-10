"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { isAuthenticated as checkAuth } from "./services/authService";
import { jwtDecode } from "jwt-decode";

// Define the shape of our user data
interface User {
  id: number;
  email: string;
  name: string;
}

// Define the shape of our JWT payload
interface JwtPayload {
  id: number;
  email: string;
  name: string;
  exp: number;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuthentication = () => {
      const authStatus = checkAuth();
      setIsAuthenticated(authStatus);
      
      // If authenticated, try to get user data from the JWT token
      if (authStatus) {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decoded: JwtPayload = jwtDecode(token);
            const userData: User = {
              id: decoded.id,
              email: decoded.email,
              name: decoded.name
            };
            setUser(userData);
          } catch (e) {
            console.error('Failed to decode JWT token', e);
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