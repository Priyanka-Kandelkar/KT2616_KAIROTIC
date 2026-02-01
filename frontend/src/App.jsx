import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/auth/RoleSelect";
import Login from "./pages/auth/Login";
import CivilianHome from "./pages/civilian/UserHome";
import AuthorityHome from "./pages/authority/AuthorityHome";
import DrillPage from "./pages/civilian/DrillPage";
import FAQPage from "./pages/civilian/FAQPage";
import FeedbackForm from "./components/feedback/FeedbackForm";
import CivilianFeedback from "./pages/authority/CivilianFeedback";
import HawkinsMap from "./components/map/HawkinsMap";
import AuthorityMap from "./pages/authority/AuthorityMap";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />

        {/* Civilian */}
        <Route path="/civilian" element={<CivilianHome />} />
        <Route path="/drill" element={<DrillPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/feedback" element={<FeedbackForm />} />

        {/* Authority */}
        <Route path="/authority" element={<AuthorityHome />} />
        <Route path="/authority/feedback" element={<CivilianFeedback />} />
        <Route path="/user-feedback" element={<CivilianFeedback />} />

        <Route
          path="/map"
          element={
            <div style={{ flex: 1, display: "flex" }}>
              <HawkinsMap />
            </div>

          }
        />

        <Route path="/authority/map" element={<AuthorityMap />} />

      </Routes>
    </BrowserRouter>
  );
}
