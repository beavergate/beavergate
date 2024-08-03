/* eslint-disable @next/next/no-async-client-component */

"use client"

import { Button } from "@/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Commercial from "modules/Commercial";
import Property from "modules/Property";
import { useRouter } from "next/navigation";
import React from "react";

const PropertyPage = async ({ params }: { params: { id: string } }) => {
  // Fetch the property data here if necessary or handle it inside the component
  const { id } = params;
  const router = useRouter()

  return (
    <div className="px-4">
      <div className="py-4">
        <Button className="rounded-md" onClick={()=>{router.back()}}>
          <ArrowBigLeft /> Back
        </Button>
      </div>
      <div className="flex gap-4">
      <Property id={id} />
      <Commercial id={id} />
      </div>
    </div>
  );
};

export default PropertyPage;
