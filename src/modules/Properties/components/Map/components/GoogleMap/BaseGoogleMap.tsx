// src/components/MapComponent.tsx

"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import BaseMarker from "./BaseMarker/BaseMarker";
import { IProperty } from "@/models/Property";
import Loader from "@/components/Loader";

export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  properties: IProperty[];
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

const BaseGoogleMap: React.FC<MapComponentProps> = ({ properties }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | undefined>(
    undefined
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api,
  });

  useEffect(() => {
    if (map && properties.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      properties.forEach((property) => {
        if (property.latitude && property.longitude) {
          bounds.extend(
            new google.maps.LatLng(property.latitude, property.longitude)
          );
        }
      });
      map.fitBounds(bounds);
    }
  }, [map, properties]);

  if (!isLoaded) {
    return <Loader />;
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
        properties.length &&
        properties.map((property: IProperty) => {
          if (!property.latitude || !property.longitude) {
            return null;
          }
          return (
            <BaseMarker
              key={property._id}
              property={property}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
            />
          );
        })}
    </GoogleMap>
  );
};

export default BaseGoogleMap;
