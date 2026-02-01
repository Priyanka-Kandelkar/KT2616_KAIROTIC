import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthIntro from "./pages/auth/AuthIntro";
import Login from "./pages/auth/Login";

import CivilianHome from "./pages/civilian/UserHome";
import AuthorityHome from "./pages/authority/AuthorityHome";

import DrillPage from "./pages/civilian/DrillPage";
import FAQPage from "./pages/civilian/FAQPage";
import FeedbackForm from "./components/feedback/FeedbackForm";

import CivilianFeedback from "./pages/authority/CivilianFeedback";

import AuthorityMap from "./pages/authority/AuthorityMap";
import CivilianMap from "./pages/civilian/CivilianMap";
import RealDisaster from "./pages/civilian/RealDisaster";
import DeclareDisaster from "./pages/authority/DeclareDisaster";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH FLOW */}
        <Route path="/" element={<AuthIntro />} />
        <Route path="/login" element={<Login />} />

        {/* CIVILIAN */}
        <Route path="/civilian" element={<CivilianHome />} />
        <Route path="/drill" element={<DrillPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/map" element={<CivilianMap />} />

        {/* AUTHORITY */}
        <Route path="/authority" element={<AuthorityHome />} />
        <Route path="/authority/feedback" element={<CivilianFeedback />} />
        <Route path="/user-feedback" element={<CivilianFeedback />} />
        <Route path="/authority/map" element={<AuthorityMap />} />

        <Route
  path="/real-disaster"
  element={
    <ProtectedRoute role="civilian">
      <RealDisaster />
    </ProtectedRoute>
  }
/>

<Route
  path="/authority/real-disaster"
  element={
    <ProtectedRoute role="authority">
      <DeclareDisaster />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}
