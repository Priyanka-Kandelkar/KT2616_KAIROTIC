import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="card-container">
        <h1 className="title">Hawkins Readiness Network</h1>
        <p className="subtitle">
          Disaster Preparedness & Emergency Coordination
        </p>

        <button className="btn" onClick={() => navigate("/user-home")}>
          User
        </button>

        <button className="btn" onClick={() => navigate("/authority-home")}>
          Authority
        </button>
      </div>
    </div>
  );
}
