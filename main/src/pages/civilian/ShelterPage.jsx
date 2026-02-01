import ShelterCard from "../../components/shelter/ShelterCard";
import { shelterService } from "../../api/supabaseService";
import { useEffect, useState } from "react";

export default function ShelterPage() {

  const [shelters, setShelters] = useState([]);

useEffect(() => {
  shelterService.getAvailableShelters()
    .then(setShelters)
    .catch(console.error);
}, []);
  return (
    <div>
      <h2>Nearby Shelters</h2>
      <ShelterCard />
    </div>
  );
}
