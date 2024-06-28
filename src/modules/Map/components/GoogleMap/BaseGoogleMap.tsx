// src/components/MapWithMarkers.tsx

"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

// Dummy data
const locations = [
  {
    id: 1,
    name: "Location 1",
    address: "123 Main St",
    lat: -3.745,
    lng: -38.523,
  },
  {
    id: 2,
    name: "Location 2",
    address: "456 Elm St",
    lat: -3.745,
    lng: -38.528,
  },
  {
    id: 3,
    name: "Location 3",
    address: "789 Oak St",
    lat: -3.75,
    lng: -38.523,
  },
];

const BaseGoogleMap: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default BaseGoogleMap;
