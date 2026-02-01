import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/context/AuthContext";

export default function ProtectedRoute({ role: allowedRole, children }) {
  const { user, role, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const normalizedUserRole = role?.toLowerCase();
  const normalizedAllowed = allowedRole?.toLowerCase();

  if (normalizedUserRole !== normalizedAllowed) {
    console.warn("ROLE BLOCKED:", normalizedUserRole, normalizedAllowed);
    return <Navigate to="/" replace />;
  }

  return children;
}
