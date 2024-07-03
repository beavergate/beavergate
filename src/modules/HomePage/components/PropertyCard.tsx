// components/PropertyCard.tsx
import { FC } from "react";
import { Building, Building2, ChevronRight } from "lucide-react";

const PropertyCard: FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-[8px] p-6 h-full">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="text-purple-0 w-8 h-8" />
          <div className="ml-2">
            <h3 className="text-[24px] font-semibold">98</h3>
            <h6 className="text-[16px] text-gray-600">Properties</h6>
          </div>
        </div>
        <a href="#" className="text-purple-0 text-[14px] font-semibold flex justify-center">
          <p className="text-purple-0">See all properties</p>
          <ChevronRight size={22} className="text-purple-0" />
        </a>
      </div>
      <div className="flex justify-between items-center mt-4 p-4 rounded-[8px] mx-auto bg-[#F0F3F9]">
        <div className="text-center">
          <h3 className="text-[24px] font-semibold">8</h3>
          <p className="text-[14px] text-gray-600">Vacant</p>
        </div>
        <div className="text-center">
          <h3 className="text-[24px] font-semibold">64</h3>
          <p className="text-[14px] text-gray-600">Occupied</p>
        </div>
        <div className="text-center">
          <h3 className="text-[24px] font-semibold">16</h3>
          <p className="text-[14px] text-gray-600">Unlisted</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
