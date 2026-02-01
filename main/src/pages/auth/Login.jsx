import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../api/supabaseService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "civilian";

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
  await authService.signUp(email, password, role, {
    full_name: fullName
  });

  alert("Signup successful. Please login.");
  setIsSignup(false);
  return;
}
 else {
        await authService.signIn(email, password);
      }

      // redirect based on role
      if (role === "authority") navigate("/authority");
      else navigate("/civilian");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
  <div className="page-container">
    <div className="card-container">
      <h1 className="login-title">
  {isSignup ? "Sign Up" : "Login"}
</h1>
      <p className="subtitle">
        Role: {role}
      </p>

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            className="input"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit">
          {isSignup ? "Create Account" : "Login"}
        </button>
      </form>

      <p
        className="subtitle"
        onClick={() => setIsSignup(!isSignup)}
        style={{ cursor: "pointer", marginTop: "20px" }}
      >
        {isSignup
          ? "Already have an account? Login"
          : "New user? Sign up"}
      </p>
    </div>
  </div>
);
}