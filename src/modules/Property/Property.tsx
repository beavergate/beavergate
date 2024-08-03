"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGetPropertyById } from "@/hooks/property";
import { Button } from "@/ui/button";
import {
  ArrowBigLeft,
  ArrowBigLeftDash,
  LucideArrowBigLeftDash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import PropertyEditDialog, { PropertyEditDialogHandle } from "./components/PropertyEditDialog";

const Property = ({ id }: { id: string }) => {
  const router = useRouter()
  const propertyEditDialogRef = useRef<PropertyEditDialogHandle>(null);
  const [getPropertyById, { loading, error }] = useGetPropertyById();
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
    <PropertyEditDialog ref={propertyEditDialogRef} property={property} onSubmit={() => {}} />
      

      
          <div className="bg-gray-100 p-4 rounded relative">
            <h2 className="text-lg font-semibold">Property Details</h2>
            <Button className="absolute top-2 right-2 text-white rounded-md" onClick={() => propertyEditDialogRef.current?.open()}>
              Edit
            </Button>
            <p>Status: {property.status}</p>
            <p>Address: {property.address}</p>
            <p>Latitude: {property.latitude}</p>
            <p>Longitude: {property.longitude}</p>
            <p>Carpet Area: {property.carpet_area}</p>
            <p>Super Built-up Area: {property.super_built_up_area}</p>
            <p>Pincode: {property.pincode}</p>
            <p>State: {property.state}</p>
            <p>Cost Centre: {property.cost_centre}</p>
          </div>
          {/* Add other sections here if needed */}
    </>
  );
};

export default Property;
