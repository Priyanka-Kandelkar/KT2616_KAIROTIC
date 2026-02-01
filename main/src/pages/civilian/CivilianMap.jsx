import HawkinsMap from "../../components/map/HawkinsMap";

export default function CivilianMap() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h2 style={{ padding: "12px" }}>Map View</h2>
      <div style={{ flex: 1, display: "flex" }}>
        <HawkinsMap />
      </div>
    </div>
  );
}
