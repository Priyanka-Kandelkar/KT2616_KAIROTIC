import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { fetchDangerZones } from "../../api/mapService";

import dangerImg from "../../assets/icon.png";
import safeImg from "../../assets/safe.png";

const MANIPAL = [13.3525, 74.7928];

const dangerIcon = new L.Icon({
  iconUrl: dangerImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const safeIcon = new L.Icon({
  iconUrl: safeImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const zoneColors = {
  red: { color: "#EF4444", fillOpacity: 0.4 },
  yellow: { color: "#F59E0B", fillOpacity: 0.3 },
  green: { color: "#10B981", fillOpacity: 0.2 },
};

export default function HawkinsMap() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    fetchDangerZones()
      .then(setZones)
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={MANIPAL}
      zoom={14}
      style={{ flex: 1, width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {zones.map((zone) => {
  const style = zoneColors[zone.zone_type];
  if (!style || !zone.coordinates) return null;

  const coords = zone.coordinates.map(c => [c.lat, c.lng]);
  const center = coords[0];

  return (
    <div key={zone.id}>
      <Polygon
        positions={coords}
        pathOptions={{
          color: style.color,
          fillColor: style.color,
          fillOpacity: style.fillOpacity,
        }}
      >
        <Popup>
          <strong>{zone.zone_type.toUpperCase()} ZONE</strong>
          <br />
          {zone.description || "Stay alert"}
        </Popup>
      </Polygon>

      <Marker
        position={center}
        icon={zone.zone_type === "red" ? dangerIcon : safeIcon}
      >
        <Popup>
          {zone.zone_type === "red" ? "Danger Zone" : "Safe Zone"}
        </Popup>
      </Marker>
    </div>
  );
})}

    </MapContainer>
  );
}
