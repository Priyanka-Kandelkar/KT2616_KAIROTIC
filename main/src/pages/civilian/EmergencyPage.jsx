import {
  initializeMap,
  addShelterMarkers,
  addDangerZones,
  getUserLocation
} from "../../api/mapUtils";


export default function EmergencyPage() {

  useEffect(() => {
  const map = initializeMap("map");

  getUserLocation().then(location => {
    addUserLocation(map, location);
  });

  shelterService.getAllShelters().then(shelters => {
    addShelterMarkers(map, shelters);
  });
}, []);



  return (
    <div>
      <h2>Emergency Alert</h2>
      <button style={{ background: "red", color: "white" }}>
        I AM IN DANGER
      </button>
    </div>
  );
}
