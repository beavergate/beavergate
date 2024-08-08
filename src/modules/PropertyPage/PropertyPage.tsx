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
import Compliance from "./components/Compliance";
import Utility from "./components/Utility";
import ProfileCard from "./components/ProfileCard";
import Loader from "@/components/Loader";

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
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4">
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
      <div className="flex justify-evenly">
        <ProfileCard />
        <Property property={property} />
      </div>
      <div className="flex">
        <div className="flex justify-evenly">
          <Commercial commercial={property.commercial} />
        </div>
        <div>
          <Compliance compliance={property.compliance} />
          <Utility utility={property.utility} />
        </div>
      </div>
      <div>
        <Landlord landlordsData={property.landlords} />
      </div>
    </div>
  );
};

export default PropertyPage;
