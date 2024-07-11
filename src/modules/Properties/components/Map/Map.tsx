import React from "react";
import BaseGoogleMap from "./components/GoogleMap";
import { Location } from "./components/GoogleMap/BaseGoogleMap";

export type MapProps = {
  locations: Location[];
};

const Map: React.FC<MapProps> = ({ locations }) => {
  return (
    <div>
      <div className="h-[calc(100vh_-88px)] w-[100%]">
        <BaseGoogleMap locations={locations} />
      </div>
    </div>
  );
};

export default Map;
