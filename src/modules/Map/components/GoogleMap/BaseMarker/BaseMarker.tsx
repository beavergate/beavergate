// src/components/MarkerComponent.tsx

"use client";

import React from "react";
import { Marker } from "@react-google-maps/api";

interface MarkerProps {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
}

const BaseMarker: React.FC<MarkerProps> = ({ id, name, position }) => {
  return <Marker key={id} position={position} title={name} />;
};

export default BaseMarker;
