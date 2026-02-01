import { useNavigate } from "react-router-dom";

export default function AuthorityHome() {
  const navigate = useNavigate();

  return (
    <>
      <div className="top-banner">
        <h1>Hawkins Readiness Network</h1>
      </div>

      <div className="dashboard">
        <h2 className="dashboard-title">Authority Dashboard</h2>

        <div className="grid">
          <div className="grid-card" onClick={() => navigate("/real-disaster")}>
            <h3>Real Disaster</h3>
          </div>

          <div className="grid-card" onClick={() => navigate("/authority/map")}>
            <h3>Map</h3>
          </div>

          <div className="grid-card" onClick={() => navigate("/faq")}>
            <h3>FAQ</h3>
          </div>

          <div className="grid-card" onClick={() => navigate("/user-feedback")}>
            <h3>Civilian Feedback</h3>
          </div>

          <div className="grid-card" onClick={() => navigate("/report")}>
            <h3>Report</h3>
          </div>
        </div>
      </div>
    </>
  );
}
