import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ role, children }) {
  const { user, profile, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  if (role && profile?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;

  <Route
  path="/authority"
  element={
    <ProtectedRoute role="authority">
      <AuthorityDashboard />
    </ProtectedRoute>
  }
/>

}