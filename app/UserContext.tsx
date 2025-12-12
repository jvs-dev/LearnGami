"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isAuthenticated as checkAuth, fetchUserData as fetchUserDataFromService } from "./services/authService";
import { getCookie, deleteCookie } from "./utils/cookies";
import { api } from "./services/api";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
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
    const checkAuthentication = async () => {
      const authStatus = checkAuth();
      setIsAuthenticated(authStatus);

      if (authStatus) {
        const token = getCookie("token");
        if (token) {
          const userData = await fetchUserDataFromService(token);
          if (userData) {
            setUser(userData);
          } else {
            setIsAuthenticated(false);
            deleteCookie('token');
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
    deleteCookie('token');    
    localStorage.removeItem('lastViewedCourse');
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
