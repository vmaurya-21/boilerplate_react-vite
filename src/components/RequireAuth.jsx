import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import Error from "../pages/Error/index";
import useLogout from "../hooks/auth/useLogout";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

/**
 * Component to require authentication based on allowed roles.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string[]} props.allowedRoles - Array of roles allowed to access the child components.
 *
 * @example
 * // Example usage:
 * <RequireAuth allowedRoles={['admin', 'user']}>
 *   <ProtectedComponent />
 * </RequireAuth>
 *
 * @returns {JSX.Element} The rendered component based on user's authentication and roles.
 */
export const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const [roles, setRoles] = useState("");
  const location = useLocation();
  const logout = useLogout(location);
  //console.log(location);
  useEffect(() => {
    if (auth?.accessToken) {
      try {
        const decoded = jwtDecode(auth.accessToken);
        setRoles(decoded?.Role || "");
      } catch (error) {
        console.error("JWT decode error:", error);
        setRoles("");
      }
    } else {
      logout();
    }
  }, [auth, logout]);

  // Render child components if user's roles are allowed, otherwise show 403 error
  return allowedRoles?.includes(roles) ? (
    <Outlet />
  ) : (
    auth?.username && <Error code="403" />
  );
};

/**
 * Component to ensure user is not authenticated.
 *
 * @component
 * @example
 * // Example usage:
 * <RequireNotAuth>
 *   <LoginComponent />
 * </RequireNotAuth>
 *
 * @returns {JSX.Element} The rendered component based on user's authentication status.
 */
export const RequireNotAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  // Redirect to home page if user is authenticated, otherwise render child components
  return auth?.username ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
