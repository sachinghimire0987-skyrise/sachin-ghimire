import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};

export default function ProtectedRoute({ children, redirectTo = "/admin/login" }: Props) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div role="status" aria-busy="true">Loading…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
