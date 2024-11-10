import { Separator } from "@/ui/separator";
import React from "react";
import { SeperatorWithNameProps } from "./types";

const SeperatorWithName: React.FC<SeperatorWithNameProps> = ({ text }) => {
  return (
    <div className="flex items-center my-4 w-full">
      <div className="flex-1">
        <Separator className="bg-[#D9D9D9] h-px" />
      </div>
      <div className="text-secondary-400 mx-2 text-center text-xs font-semibold leading-[24px] font-primary whitespace-nowrap">
        {text}
      </div>
      <div className="flex-1">
        <Separator className="bg-[#D9D9D9] h-px" />
      </div>
    </div>
  );
};

export default SeperatorWithName;
