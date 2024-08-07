"use client";
import React from "react";
import { Button } from "@/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Commercial from "./components/Commercial";
import Property from "./components/Property";
import Landlord from "./components/Landlord";

const PropertyPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || ""; // Ensure id is a string
  // Fetch the property data here if necessary or handle it inside the component
  const router = useRouter();
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
        <Property id={id} />
        <Commercial id={id} />
      </div>
      <div>
        <Landlord id={id} />
      </div>
    </div>
  );
};

export default PropertyPage;
