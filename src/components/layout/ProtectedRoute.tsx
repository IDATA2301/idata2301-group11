import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

/** Props for the route guard component. */
type ProtectedRouteProps = {
  adminOnly?: boolean;
};

/** Route guard that requires authentication and optionally admin access. */
export function ProtectedRoute({ adminOnly = false }: ProtectedRouteProps) {
  const { authUser } = useAuth();
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && authUser.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
