import InputPopover from "@/components/InputPopover";
import React, { useEffect, useState } from "react";
import BaseGoogleMap from "./components/GoogleMap";
import { Location } from "./components/GoogleMap/BaseGoogleMap";
import axios from "axios";

const locations: Location[] = [
  {
    id: 1,
    name: "Location 1",
    address: "123 Main St",
    lat: -3.845,
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
  {
    id: 4,
    name: "Location 4",
    address: "101 Maple Ave",
    lat: -3.755,
    lng: -38.533,
  },
  {
    id: 5,
    name: "Location 5",
    address: "202 Birch Ln",
    lat: -3.765,
    lng: -40.543,
  },
];

const Map = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  console.log("locations", locations);
  const fetchCoordinates = async () => {
    try {
      const addresses = locations.map((location) => location.address);
      const query = addresses
        .map((address) => `address=${encodeURIComponent(address)}`)
        .join("&");
      const response = await axios.get(`/api/geocode?${query}`);
      const data = response.data;

      if (response.status === 200) {
        const updatedLocations = locations.map((location) => {
          const geoData = data.find((d: any) => d.address === location.address);
          if (geoData && geoData.lat && geoData.lng) {
            return { ...location, lat: geoData.lat, lng: geoData.lng };
          }
          return location;
        });

        setLocations(updatedLocations);
      } else {
        console.error("Error fetching coordinates:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch coordinates:", error);
    }
  };

  useEffect(() => {
    if (locations.length) {
      fetchCoordinates();
    }
  }, [locations]);

  return (
    <div>
      <InputPopover
        handleJsonData={(data) => setLocations(data as Location[])}
      />
      <BaseGoogleMap locations={locations} />
    </div>
  );
};

export default Map;
