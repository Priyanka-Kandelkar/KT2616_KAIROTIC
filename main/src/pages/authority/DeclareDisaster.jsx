import { useState } from "react";
import {
  activateDisaster,
  deactivateDisaster,
} from "../../api/disasterService";
import { useAuth } from "../context/AuthContext";
import "../../styles/disaster.css";

export default function DeclareDisaster() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const activate = async (type) => {
    setLoading(true);
    await activateDisaster(type, user.id);
    setLoading(false);
  };

  const deactivate = async () => {
    setLoading(true);
    await deactivateDisaster();
    setLoading(false);
  };

  return (
    <div className="authority-panel">
      <h2>Authority Disaster Control</h2>

      <div className="authority-buttons">
        <button onClick={() => activate("earthquake")}>
          Declare Earthquake
        </button>
        <button onClick={() => activate("flood")}>
          Declare Flood
        </button>
        <button onClick={() => activate("cyclone")}>
          Declare Cyclone
        </button>
      </div>

      <hr />

      <button className="end-btn" onClick={deactivate}>
        End Disaster
      </button>

      {loading && <p>Updating system state…</p>}
    </div>
  );
}