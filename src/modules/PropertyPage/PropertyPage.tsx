"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Commercial from "./components/Commercial";
import Property from "./components/Property";
import Landlord from "./components/Landlord";
import { useGetPropertyById } from "@/hooks/property";
import { IProperty, IPropertyFUll } from "@/models/Property";

const PropertyPage = () => {
  const { id } = useParams();

  const router = useRouter();

  const [getPropertyById, { loading, error }] = useGetPropertyById();
  const [property, setProperty] = useState<IPropertyFUll | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id as string);
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>data not found</div>;
  }

  return (
    <div className="px-4">
      <div className="py-4">
        <Button
          className="rounded-md"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBigLeft /> Back
        </Button>
      </div>
      <div className="flex">
        <Property property={property} />
        <Commercial commercial={property.commercial} />
      </div>
      <div>
        <Landlord landlords={property.landlords} />
      </div>
    </div>
  );
};

export default PropertyPage;
