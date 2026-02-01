import { useEffect, useState } from "react";
import { fetchActiveDisaster } from "../../api/disasterService";
import "../../styles/disaster.css";

export default function RealDisaster() {
  const [disaster, setDisaster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveDisaster().then(({ data }) => {
      setDisaster(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="disaster-msg">Checking disaster status…</p>;

  if (!disaster) {
    return (
      <div className="disaster-safe">
        <h2>No Active Disasters 🌤️</h2>
        <p>You’re safe for now. Stay alert.</p>
      </div>
    );
  }

  return (
    <div className="disaster-active">
      <h2>🚨 {disaster.active_disaster_type.toUpperCase()} ALERT</h2>
      <p>
        Declared at{" "}
        {new Date(disaster.activated_at).toLocaleString()}
      </p>

      <div className="disaster-actions">
        <button>Safety Guidelines</button>
        <button>Nearby Shelters</button>
        <button>Emergency Contacts</button>
      </div>
    </div>
  );
}