import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const navigate = useNavigate();

  return (
    <>
      <div className="top-banner">
        <h1>Hawkins Readiness Network</h1>
      </div>

      <div className="dashboard">
        <h2 className="dashboard-title">User Dashboard</h2>

        <div className="grid">
          <div className="grid-card" onClick={() => navigate("/drill")}>
            <h3>Test Drill</h3>
          </div>

          <div className="grid-card" onClick={() => navigate("/real-disaster")}>
            <h3>Real Disaster</h3>
          </div>

          <div className="grid-card" onClick={() => navigate("/map")}>
            <h3>Map</h3>
          </div>

          <div className="grid-card" onClick={() => navigate("/faq")}>
            <h3>FAQ</h3>
          </div>

          <div className="grid-card" onClick={() => navigate("/feedback")}>
            <h3>Feedback</h3>
          </div>
        </div>
      </div>
    </>
  );
}
