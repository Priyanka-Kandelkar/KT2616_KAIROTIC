import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthIntro.css";

import skyNormal from "../../assets/sky_normal.png";
import cloudsNormal from "../../assets/clouds_normal.png";
import skyUpside from "../../assets/sky_upside.png";
import cloudsUpside from "../../assets/clouds_upside.png";

import l1 from "../../assets/lightning1.png";
import l2 from "../../assets/lightning2.png";
import l3 from "../../assets/lightning3.png";

const lightnings = [l1, l2, l3];

export default function AuthIntro() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("normal");
  const [lightning, setLightning] = useState(null);
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("glitch"), 1200);
    const t2 = setTimeout(() => setPhase("upside"), 3000);
    const t3 = setTimeout(() => setShowRoles(true), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (phase !== "upside") return;

    const interval = setInterval(() => {
      const random = lightnings[Math.floor(Math.random() * lightnings.length)];
      setLightning(random);
      setTimeout(() => setLightning(null), 200);
    }, 2000);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className={`auth-intro ${phase}`}>
      <img
        src={phase === "upside" ? skyUpside : skyNormal}
        className="layer sky"
        alt=""
      />

      <img
        src={phase === "upside" ? cloudsUpside : cloudsNormal}
        className={`layer clouds ${phase}`}
        alt=""
      />

      <div className="particles" />
      <div className="noise" />

      {lightning && (
        <img src={lightning} className="layer lightning" alt="" />
      )}

      {showRoles && (
        <div className="role-banner">
          <h1 className="title upside">SELECT YOUR ROLE</h1>

          <div className="role-buttons">
            <button
              onClick={() =>
                navigate("/login", { state: { role: "civilian" } })
              }
            >
              CIVILIAN
            </button>

            <button
              onClick={() =>
                navigate("/login", { state: { role: "authority" } })
              }
            >
              AUTHORITY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
