import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  const chooseRole = (role) => {
    navigate("/login", { state: { role } });
  };

  return (
  <div className="page-container">
    <div className="card-container">
      <h1 className="title">Select Your Role</h1>
      <p className="subtitle">
        Choose how you want to continue
      </p>

      <button
        className="btn"
        onClick={() => chooseRole("civilian")}
      >
        Civilian
      </button>

      <button
        className="btn"
        onClick={() => chooseRole("authority")}
      >
        Authority
      </button>
    </div>
  </div>
);
}