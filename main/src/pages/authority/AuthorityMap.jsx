import HawkinsMap from "../../components/map/HawkinsMap";

export default function AuthorityMap() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h2 style={{ padding: "12px" }}>Authority Map View</h2>
      <div style={{ flex: 1, display: "flex" }}>
        <HawkinsMap />
      </div>
    </div>
  );
}
