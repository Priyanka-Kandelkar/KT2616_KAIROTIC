import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import UserHome from "../pages/civilian/UserHome";
import AuthorityHome from "../pages/authority/AuthorityHome";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-home" element={<UserHome />} />
      <Route path="/authority-home" element={<AuthorityHome />} />
    </Routes>
  );
}
