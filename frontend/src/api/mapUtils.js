// ============================================
// OPENSTREETMAP INTEGRATION WITH LEAFLET
// ============================================

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// ============================================
// CUSTOM MARKER ICONS
// ============================================

// Shelter marker (blue house icon)
export const shelterIcon = L.divIcon({
  className: 'custom-shelter-marker',
  html: `<div style="background-color: #3B82F6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// User location marker (red pin)
export const userLocationIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="background-color: #EF4444; color: white; width: 35px; height: 35px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
    <div style="transform: rotate(45deg);">📍</div>
  </div>`,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

// Emergency alert marker (orange warning)
export const emergencyIcon = L.divIcon({
  className: 'custom-emergency-marker',
  html: `<div style="background-color: #F59E0B; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); animation: pulse 2s infinite;">
    ⚠️
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// ============================================
// MAP INITIALIZATION
// ============================================

/**
 * Initialize a Leaflet map with OpenStreetMap tiles
 * @param {string} containerId - ID of the HTML element to contain the map
 * @param {Object} options - Map configuration options
 * @returns {L.Map} - Leaflet map instance
 */
export function initializeMap(containerId, options = {}) {
  const {
    center = [13.3409, 74.7421], // Default: Udupi, Karnataka
    zoom = 13,
    maxZoom = 18,
    minZoom = 10
  } = options;

  const map = L.map(containerId, {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView(center, zoom);

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom,
    minZoom
  }).addTo(map);

  return map;
}

// ============================================
// SHELTER MARKERS
// ============================================

/**
 * Add shelter markers to the map
 * @param {L.Map} map - Leaflet map instance
 * @param {Array} shelters - Array of shelter objects
 * @returns {L.LayerGroup} - Layer group containing all shelter markers
 */
export function addShelterMarkers(map, shelters) {
  const markers = [];

  shelters.forEach(shelter => {
    const marker = L.marker([shelter.latitude, shelter.longitude], {
      icon: shelterIcon,
      title: shelter.name
    });

    const occupancyPercent = (shelter.current_occupancy / shelter.capacity * 100).toFixed(0);
    const statusColor = shelter.status === 'open' ? '#10B981' : 
                       shelter.status === 'full' ? '#EF4444' : '#F59E0B';

    const popupContent = `
      <div style="min-width: 200px;">
        <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">${shelter.name}</h3>
        <div style="margin-bottom: 8px;">
          <strong>Status:</strong> 
          <span style="color: ${statusColor}; font-weight: bold;">${shelter.status.toUpperCase()}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Capacity:</strong> ${shelter.current_occupancy} / ${shelter.capacity} (${occupancyPercent}%)
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Disasters:</strong> ${shelter.disaster_types.join(', ')}
        </div>
        ${shelter.amenities && shelter.amenities.length > 0 ? `
          <div style="margin-bottom: 8px;">
            <strong>Amenities:</strong> ${shelter.amenities.join(', ')}
          </div>
        ` : ''}
        ${shelter.contact_phone ? `
          <div style="margin-bottom: 8px;">
            <strong>Contact:</strong> ${shelter.contact_phone}
          </div>
        ` : ''}
        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;">
          <button onclick="getDirections(${shelter.latitude}, ${shelter.longitude})" 
                  style="background: #3B82F6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; width: 100%;">
            Get Directions
          </button>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    marker.addTo(map);
    markers.push(marker);
  });

  return L.layerGroup(markers);
}

// ============================================
// DANGER ZONES (RED/YELLOW/GREEN)
// ============================================

/**
 * Add danger zones to the map
 * @param {L.Map} map - Leaflet map instance
 * @param {Array} zones - Array of danger zone objects
 * @returns {L.LayerGroup} - Layer group containing all zone polygons
 */
export function addDangerZones(map, zones) {
  const polygons = [];

  zones.forEach(zone => {
    const color = zone.zone_type === 'red' ? '#EF4444' :
                  zone.zone_type === 'yellow' ? '#F59E0B' : '#10B981';
    
    const opacity = zone.zone_type === 'red' ? 0.4 :
                    zone.zone_type === 'yellow' ? 0.3 : 0.2;

    const coordinates = zone.coordinates.map(coord => [coord.lat, coord.lng]);

    const polygon = L.polygon(coordinates, {
      color: color,
      fillColor: color,
      fillOpacity: opacity,
      weight: 2
    });

    const popupContent = `
      <div>
        <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: ${color};">
          ${zone.zone_type.toUpperCase()} ZONE
        </h3>
        ${zone.disaster_type ? `<div><strong>Disaster:</strong> ${zone.disaster_type}</div>` : ''}
        ${zone.description ? `<div style="margin-top: 8px;">${zone.description}</div>` : ''}
      </div>
    `;

    polygon.bindPopup(popupContent);
    polygon.addTo(map);
    polygons.push(polygon);
  });

  return L.layerGroup(polygons);
}

// ============================================
// USER LOCATION
// ============================================

/**
 * Add user's current location marker
 * @param {L.Map} map - Leaflet map instance
 * @param {Object} position - {latitude, longitude}
 * @returns {L.Marker} - User location marker
 */
export function addUserLocation(map, position) {
  const marker = L.marker([position.latitude, position.longitude], {
    icon: userLocationIcon,
    title: 'Your Location'
  });

  marker.bindPopup(`
    <div style="text-align: center;">
      <strong>Your Current Location</strong>
    </div>
  `);

  marker.addTo(map);
  
  // Add a circle around user location
  L.circle([position.latitude, position.longitude], {
    color: '#EF4444',
    fillColor: '#EF4444',
    fillOpacity: 0.1,
    radius: 500 // 500 meters
  }).addTo(map);

  return marker;
}

// ============================================
// ROUTING & DIRECTIONS
// ============================================

/**
 * Calculate and display route from user to destination
 * @param {L.Map} map - Leaflet map instance
 * @param {Object} from - {latitude, longitude}
 * @param {Object} to - {latitude, longitude}
 */
export async function showRoute(map, from, to) {
  // Using OpenRouteService API (free, but requires API key)
  // Alternative: Use simple straight line or OSRM
  
  // For now, draw a simple polyline
  const routeLine = L.polyline([
    [from.latitude, from.longitude],
    [to.latitude, to.longitude]
  ], {
    color: '#3B82F6',
    weight: 4,
    opacity: 0.7,
    dashArray: '10, 10'
  }).addTo(map);

  // Fit map to show entire route
  map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

  // Calculate straight-line distance
  const distance = map.distance(
    [from.latitude, from.longitude],
    [to.latitude, to.longitude]
  );

  const distanceKm = (distance / 1000).toFixed(2);
  const distanceMin = Math.ceil(distance / 83.33); // Assuming 5 km/h walking speed

  return {
    line: routeLine,
    distance: distanceKm,
    duration: distanceMin
  };
}

// ============================================
// GEOLOCATION
// ============================================

/**
 * Get user's current geolocation
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

// ============================================
// CALCULATE NEAREST SHELTER
// ============================================

/**
 * Find the nearest shelter to user's location
 * @param {Object} userLocation - {latitude, longitude}
 * @param {Array} shelters - Array of shelter objects
 * @param {string} disasterType - Optional: filter by disaster type
 * @returns {Object} - Nearest shelter with distance
 */
export function findNearestShelter(userLocation, shelters, disasterType = null) {
  let filteredShelters = shelters.filter(s => s.status === 'open');

  if (disasterType) {
    filteredShelters = filteredShelters.filter(s => 
      s.disaster_types.includes(disasterType)
    );
  }

  if (filteredShelters.length === 0) return null;

  const userLatLng = L.latLng(userLocation.latitude, userLocation.longitude);

  const sheltersWithDistance = filteredShelters.map(shelter => {
    const shelterLatLng = L.latLng(shelter.latitude, shelter.longitude);
    const distance = userLatLng.distanceTo(shelterLatLng);
    
    return {
      ...shelter,
      distance: distance,
      distanceKm: (distance / 1000).toFixed(2),
      walkingMinutes: Math.ceil(distance / 83.33) // 5 km/h walking speed
    };
  });

  sheltersWithDistance.sort((a, b) => a.distance - b.distance);

  return sheltersWithDistance[0];
}

// ============================================
// MAP LAYERS CONTROL
// ============================================

/**
 * Create layer control for toggling different map layers
 * @param {L.Map} map - Leaflet map instance
 * @param {Object} layers - Object containing named layers
 */
export function addLayerControl(map, layers) {
  const baseLayers = {
    'Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }),
    'Satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics'
    })
  };

  L.control.layers(baseLayers, layers, {
    position: 'topright',
    collapsed: false
  }).addTo(map);
}

// ============================================
// EXPORT ALL UTILITIES
// ============================================

export default {
  initializeMap,
  addShelterMarkers,
  addDangerZones,
  addUserLocation,
  showRoute,
  getUserLocation,
  findNearestShelter,
  addLayerControl,
  shelterIcon,
  userLocationIcon,
  emergencyIcon
};