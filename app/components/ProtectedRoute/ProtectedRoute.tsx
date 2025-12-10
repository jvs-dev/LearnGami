"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = "ADMIN" 
}) => {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication and role
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/login");
    } else if (requiredRole && user?.role !== requiredRole) {
      // Redirect to home if user doesn't have required role
      router.push("/");
    } else {
      // User meets all requirements
      setIsLoading(false);
    }
  }, [isAuthenticated, user, router, requiredRole]);

  if (isLoading) {
    return (
      <div className="protected-route__loading">
        <p>Verificando permissões...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;