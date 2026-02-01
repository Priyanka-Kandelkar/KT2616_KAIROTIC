import { useState } from "react";
import "./DrillSelector.css";

export default function DrillSelector() {
  const [selectedDrill, setSelectedDrill] = useState(null);

  if (!selectedDrill) {
    return (
      <div className="drill-container">
        <h3>Select Disaster Drill</h3>

        <div className="drill-cards">
          <button
            className="card earthquake"
            onClick={() => setSelectedDrill("earthquake")}
          >
            🌍 Earthquake
          </button>

          <button
            className="card flood"
            onClick={() => setSelectedDrill("flood")}
          >
            🌊 Flood
          </button>

          <button
            className="card cyclone"
            onClick={() => setSelectedDrill("cyclone")}
          >
            🌀 Cyclone
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <span className="close-btn" onClick={() => setSelectedDrill(null)}>
        ✖
      </span>

      {selectedDrill === "earthquake" && (
        <>
          <h3>🌍 Earthquake Drill</h3>
          <ul>
            <li>Drop, Cover, and Hold On</li>
            <li>Stay away from glass and heavy objects</li>
            <li>Move to open area after shaking stops</li>
          </ul>
        </>
      )}

      {selectedDrill === "flood" && (
        <>
          <h3>🌊 Flood Drill</h3>
          <ul>
            <li>Move to higher ground immediately</li>
            <li>Do not walk or drive through flood water</li>
            <li>Turn off electricity</li>
          </ul>
        </>
      )}

      {selectedDrill === "cyclone" && (
        <>
          <h3>🌀 Cyclone Drill</h3>
          <ul>
            <li>Stay indoors and away from windows</li>
            <li>Secure loose items outside</li>
            <li>Follow official warnings</li>
          </ul>
        </>
      )}

      <a
        href="https://www.google.com/maps/search/emergency+shelter+near+me"
        target="_blank"
        rel="noreferrer"
        className="shelter-link"
      >
        📍 View Nearby Shelters
      </a>
    </div>
  );
}