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


// import { Routes, Route } from "react-router-dom";
// import Login from "../pages/auth/Login";
// import UserHome from "../pages/civilian/UserHome";
// import AuthorityHome from "../pages/authority/AuthorityHome";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/user-home" element={<UserHome />} />
//       <Route path="/authority-home" element={<AuthorityHome />} />
//     </Routes>
//   );
// }
