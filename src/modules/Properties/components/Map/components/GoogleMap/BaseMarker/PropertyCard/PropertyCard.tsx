// src/components/PropertyCard.tsx

import { IProperty } from "@/models/Property";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  property: IProperty;
};

const PropertyCard: React.FC<Props> = ({ property }) => {
  const router = useRouter();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{property.name}</CardTitle>
        <CardDescription>{property.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <strong>Status:</strong> {property.status}
        </div>
        <div>
          <strong>Cost Centre:</strong> {property.cost_centre || "N/A"}
        </div>
        <div>
          <strong>Carpet Area:</strong> {property.carpet_area || "N/A"} sq. ft.
        </div>
        <div>
          <strong>Super Built-Up Area:</strong>{" "}
          {property.super_built_up_area || "N/A"} sq. ft.
        </div>
        <div>
          <strong>State:</strong> {property.state}
        </div>
        <div>
          <strong>Pincode:</strong> {property.pincode}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => {
            router.push(`/properties/${property._id}`);
          }}
        >
          Go to property
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
