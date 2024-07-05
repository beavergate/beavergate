import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BaseGoogleMap from "./components/GoogleMap";
import { Location } from "./components/GoogleMap/BaseGoogleMap";

export type MapProps = {
  locations: Location[]
}

const Map: React.FC<MapProps>= ({locations}) => {
  const [locationsCoords, setLocationsCoords] = useState<Location[]>([]);

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

        setLocationsCoords(updatedLocations);
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
      <div className="h-[calc(100vh_-88px)] w-[100%]">
        <BaseGoogleMap locations={locationsCoords} />
      </div>
    </div>
  );
};

export default Map;
