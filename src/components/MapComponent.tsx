// src/components/MapComponent.tsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../leaflet-fixes.css"; // Import our CSS fixes
import { LatLngExpression } from "leaflet";
import { ContentData } from "../types";

// Fix leaflet icon issue
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";

// Fix default icon issue
const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// Apply the default icon
L.Marker.prototype.options.icon = DefaultIcon;

// Add explicit styles to ensure map container is visible
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

interface MapComponentProps {
  data: ContentData;
}

const MapComponent: React.FC<MapComponentProps> = ({ data }) => {
  const position: LatLngExpression = data.position || [51.505, -0.09]; // Default: London
  const zoom = data.zoom || 13;

  // Force map to redraw when component mounts
  useEffect(() => {
    // Trigger resize event to force map to recalculate size
    window.dispatchEvent(new Event('resize'));
    
    // This timeout helps ensure the map is fully initialized
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto h-96">
      <MapContainer 
        center={position as LatLngExpression}
        zoom={zoom}
        scrollWheelZoom={false}
        style={mapContainerStyle}
        className="h-full w-full rounded-lg shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>You're here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;