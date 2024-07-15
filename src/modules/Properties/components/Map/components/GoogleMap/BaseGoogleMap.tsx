// src/components/MapComponent.tsx

"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import BaseMarker from "./BaseMarker/BaseMarker";

export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
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

const api = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const BaseGoogleMap: React.FC<MapComponentProps> = ({ locations }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api,
  });
  useEffect(() => {
    if (map && locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(
          new google.maps.LatLng(location.latitude, location.longitude)
        );
      });
      map.fitBounds(bounds);
    }
  }, [map, locations]);

  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
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
        locations.length &&
        locations.map((location: any) => {
          if (!location.latitude || !location.longitude) {
            return null;
          }
          return (
            <BaseMarker
              key={location.id}
              id={location.id}
              name={location.name}
              position={{ lat: location.latitude, lng: location.longitude }}
            />
          );
        })}
    </GoogleMap>
  );
};

export default BaseGoogleMap;
