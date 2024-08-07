"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGetPropertyById } from "@/hooks/property";
import { Button } from "@/ui/button";
import PropertyEditDialog, {
  PropertyEditDialogHandle,
} from "./components/PropertyEditDialog";
import { IProperty } from "@/models/Property";

type Props = {
  property: IProperty;
};

const Property: React.FC<Props> = ({ property }) => {
  const propertyEditDialogRef = useRef<PropertyEditDialogHandle>(null);

  if (!property) {
    return <div>Loading...</div>;
  }

  // Array of property fields to display
  const propertyFields = [
    { label: "Status", value: property.status },
    { label: "Address", value: property.address },
    { label: "Latitude", value: property.latitude },
    { label: "Longitude", value: property.longitude },
    { label: "Carpet Area", value: property.carpet_area },
    { label: "Super Built-up Area", value: property.super_built_up_area },
    { label: "Pincode", value: property.pincode },
    { label: "State", value: property.state },
    { label: "Cost Centre", value: property.cost_centre },
  ];

  return (
    <>
      <PropertyEditDialog
        ref={propertyEditDialogRef}
        property={property}
        onSubmit={() => {}}
      />

      <div className="flex flex-col md:flex-row  p-8 rounded-lg space-y-6 md:space-y-0 md:space-x-8">
        {/* Left Side - Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4 md:w-1/3">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
            GM
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Geetansh Marodia</h3>
            <p>Senior Associate, Business</p>
            <p>Finance</p>
            <p className="font-semibold">Finance</p>
            <p className="text-gray-500">UN10359</p>
            <p className="text-blue-500">geetansh.marodia@unacademy.com</p>
          </div>
        </div>

        {/* Right Side - Overview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md md:w-2/3">
          <div className="p-4 rounded relative">
            <h2 className="text-lg font-semibold">Property Details</h2>
            <Button
              className="absolute top-2 right-2 text-white rounded-md"
              onClick={() => propertyEditDialogRef.current?.open()}
            >
              Edit
            </Button>
            <div className="py-4">
              {propertyFields.map((field, index) => (
                <p key={index}>
                  <strong>{field.label}:</strong> {field.value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
