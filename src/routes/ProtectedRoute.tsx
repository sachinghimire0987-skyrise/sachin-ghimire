import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * This file expects your app to expose a `useAuth()` hook that returns:
 * { user?: { role?: string }, isAuthenticated: boolean, loading: boolean }
 *
 * If you don't have that hook, either implement it using React context (recommended),
 * or replace the call below with your auth check (localStorage token, redux, etc).
 */
type User = {
  id?: string;
  role?: string;
  [key: string]: any;
};

type AuthState = {
  user?: User | null;
  isAuthenticated: boolean;
  loading?: boolean;
};

declare function useAuth(): AuthState | undefined;

/**
 * Props:
 * - redirectTo: path to send unauthenticated users (defaults to /login)
 * - allowedRoles: if provided, only users whose user.role is contained are allowed
 * - children: optional children; if omitted, <Outlet /> is returned so this component can be used as a route wrapper
 */
type ProtectedRouteProps = {
  redirectTo?: string;
  allowedRoles?: string[];
  children?: React.ReactNode;
  fallback?: React.ReactNode;
};

export const RequireAuth: React.FC<ProtectedRouteProps> = ({
  redirectTo = "/login",
  allowedRoles,
  children,
  fallback = null,
}) => {
  const location = useLocation();

  // Prefer your app's useAuth hook. If not present, fall back to a simple token check.
  // IMPORTANT: Replace this fallback with your real auth/context implementation.
  const auth = (typeof useAuth === "function" ? useAuth() : undefined) ?? {
    isAuthenticated: Boolean(typeof window !== "undefined" && localStorage.getItem("token")),
    user: null,
    loading: false,
  };

  const { isAuthenticated, user, loading } = auth;

  if (loading) {
    // Accessible loading indicator while the auth state is determined.
    return (
      <div role="status" aria-live="polite" aria-busy="true">
        {fallback ?? "Loading…"}
      </div>
    );
  }

  if (!isAuthenticated) {
    // Save the location attempted so the login page can redirect back after success
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = user?.role;
    // If role is missing or not allowed, redirect to a 403/unauthorized page (adjust path as needed)
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If children present, render them (useful for HOC-style wrapping). Otherwise render outlet for nested routes.
  return children ? <>{children}</> : <Outlet />;
};

export default RequireAuth;

/**
 * Example usage with React Router v6:
 *
 * <Routes>
 *   <Route element={<RequireAuth />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 *
 *   // Role-protected
 *   <Route element={<RequireAuth allowedRoles={['admin']} />}>
 *     <Route path="/admin" element={<AdminPanel />} />
 *   </Route>
 *
 *   // HOC-style (if you want to wrap a component directly)
 *   <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
 * </Routes>
 *
 * On the login page, use:
 * const location = useLocation();
 * const from = (location.state as { from?: Location })?.from?.pathname || "/";
 * // After successful login: navigate(from, { replace: true });
 */
