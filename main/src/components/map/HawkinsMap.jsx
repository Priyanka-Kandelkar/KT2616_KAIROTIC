import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import dangerImg from "../../assets/icon.png";
import safeImg from "../../assets/safe.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const dangerIcon = new L.Icon({
  iconUrl: dangerImg,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

const safeIcon = new L.Icon({
  iconUrl: safeImg,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

const MANIPAL = [13.3525, 74.7928];

const dangerZones = [
  { id: 1, center: [13.3462, 74.7815], radius: 180 },
  { id: 2, center: [13.3591, 74.7754], radius: 200 },
  { id: 3, center: [13.3418, 74.7952], radius: 160 },
  { id: 4, center: [13.3634, 74.7881], radius: 190 },
  { id: 5, center: [13.3489, 74.8033], radius: 170 },
  { id: 6, center: [13.3566, 74.8094], radius: 180 },
  { id: 7, center: [13.3672, 74.7971], radius: 200 },
  { id: 8, center: [13.3399, 74.7866], radius: 160 },
  { id: 9, center: [13.3621, 74.8042], radius: 190 },
  { id: 10, center: [13.3447, 74.7998], radius: 170 },
];

const greenZones = [
  {
    id: 1,
    center: [13.3702, 74.8201],
    radius: 220,
    shelters: [
      { name: "Shelter 1A", position: [13.3706, 74.8205] },
      { name: "Shelter 1B", position: [13.3698, 74.8196] },
    ],
  },
  {
    id: 2,
    center: [13.3304, 74.7602],
    radius: 230,
    shelters: [
      { name: "Shelter 2A", position: [13.3301, 74.7608] },
      { name: "Shelter 2B", position: [13.3310, 74.7596] },
      { name: "Shelter 2C", position: [13.3297, 74.7600] },
    ],
  },
  {
    id: 3,
    center: [13.3825, 74.7856],
    radius: 210,
    shelters: [{ name: "Shelter 3A", position: [13.3829, 74.7861] }],
  },
  {
    id: 4,
    center: [13.3211, 74.8024],
    radius: 240,
    shelters: [
      { name: "Shelter 4A", position: [13.3216, 74.8028] },
      { name: "Shelter 4B", position: [13.3207, 74.8019] },
    ],
  },
  {
    id: 5,
    center: [13.3748, 74.7549],
    radius: 220,
    shelters: [
      { name: "Shelter 5A", position: [13.3753, 74.7553] },
      { name: "Shelter 5B", position: [13.3744, 74.7545] },
    ],
  },
];

export default function HawkinsMap() {
  return (
    <MapContainer
    center={MANIPAL}
    zoom={13}
    style={{ height: "100%", width: "100%" }}
  >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {dangerZones.map((zone) => (
        <Circle
          key={`danger-${zone.id}`}
          center={zone.center}
          radius={zone.radius}
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.25 }}
        >
          <Marker position={zone.center} icon={dangerIcon}>
            <Popup>Threat Zone</Popup>
          </Marker>
        </Circle>
      ))}

      {greenZones.map((zone) => (
        <Circle
          key={`green-${zone.id}`}
          center={zone.center}
          radius={zone.radius}
          pathOptions={{ color: "green", fillColor: "green", fillOpacity: 0.25 }}
        >
          <Marker position={zone.center} icon={safeIcon}>
            <Popup>Safe Zone</Popup>
          </Marker>

          {zone.shelters.map((shelter, i) => (
            <Marker key={i} position={shelter.position}>
              <Popup>{shelter.name}</Popup>
            </Marker>
          ))}
        </Circle>
      ))}
    </MapContainer>
  );
}