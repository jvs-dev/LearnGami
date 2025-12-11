"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../UserContext";
import { getCookie } from "../../utils/cookies";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = "ADMIN",
}) => {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      const token = getCookie("token");
      const hasCookie = !!token;

      if (!hasCookie && !isAuthenticated) {
        router.push("/login");
        return;
      }

      if (hasCookie && !user) {
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push("/");
      } else {
        setIsVerifying(false);
      }
    };

    const timeout = setTimeout(checkAccess, 100);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, user, router, requiredRole]);

  if (isVerifying) {
    return (
      <div className="protected-route">
        <div className="protected-route__loading">
          <div className="protected-route__loading-spinner"></div>
          <p className="protected-route__loading-text">
            Verificando permissões...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
