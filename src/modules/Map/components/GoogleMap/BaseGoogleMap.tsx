// src/components/MapComponent.tsx

"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import BaseMarker from "./BaseMarker/BaseMarker";

export interface Location {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations: Location[];
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const BaseGoogleMap: React.FC<MapComponentProps> = ({ locations }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map && locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(new google.maps.LatLng(location.lat, location.lng));
      });
      map.fitBounds(bounds);
    }
  }, [map, locations]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {map &&
          locations.map((location) => (
            <BaseMarker
              key={location.id}
              id={location.id}
              name={location.name}
              position={{ lat: location.lat, lng: location.lng }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default BaseGoogleMap;
