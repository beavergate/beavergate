"use client";

import React, { useState } from "react";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { IProperty } from "@/models/Property";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import PropertyCard from "./PropertyCard";

interface MarkerProps {
  property: IProperty;
  activeMarker: string | undefined;
  setActiveMarker: (id: string | undefined) => void;
}

const BaseMarker: React.FC<MarkerProps> = ({
  property,
  activeMarker,
  setActiveMarker,
}) => {
  const { _id, name, latitude, longitude } = property;
  const position = { lat: latitude!, lng: longitude! };

  return (
    <>
      <MarkerF
        key={_id}
        onClick={() => setActiveMarker(_id)}
        position={position}
        title={name}
      >
        {activeMarker === _id ? (
          <InfoWindowF onCloseClick={() => setActiveMarker(undefined)}>
            <PropertyCard key={_id} property={property} />
          </InfoWindowF>
        ) : null}
      </MarkerF>
    </>
  );
};

export default BaseMarker;
