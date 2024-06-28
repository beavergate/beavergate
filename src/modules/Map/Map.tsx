import InputPopover from "@/components/InputPopover";
import React from "react";
import BaseGoogleMap from "./components/GoogleMap";

const Map = () => {
  return (
    <div>
      <div className="absolute z-10 m-20">
        <InputPopover />
      </div>
      <div className=" h-[calc(100vh_-88px)] w-[100%]">
        <BaseGoogleMap />
      </div>
    </div>
  );
};

export default Map;
