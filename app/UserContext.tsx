"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isAuthenticated as checkAuth } from "./services/authService";
import { api } from "./services/api";

// Helper function to get cookie value by name
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

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

const fetchUserData = async (token: string) => {
  try {
    const { data, error } = await api.get("/auth/me", token);
    if (error) {
      console.error("Failed to fetch user data:", error);
      return null;
    }
    return data.user as User;
  } catch (e) {
    console.error("Failed to fetch user data:", e);
    return null;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authStatus = checkAuth();
      setIsAuthenticated(authStatus);

      if (authStatus) {
        // Use the same cookie helper function as authService
        const token = getCookie("token");
        if (token) {
          const userData = await fetchUserData(token);
          if (userData) {
            setUser(userData);
          } else {
            setIsAuthenticated(false);
            // Clear the cookie if user data couldn't be fetched
            document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
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
    // Clear the cookie on logout
    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
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
