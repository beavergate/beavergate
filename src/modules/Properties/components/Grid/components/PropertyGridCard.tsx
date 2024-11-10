import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IProperty } from "@/models/Property";
import Image from "next/image";
import propertyImage from "assets/property.jpg";

interface PropertyCardProps {
  property: IProperty;
  onClick: (id: string) => void;
}

export default function PropertyGridCard({
  property,
  onClick,
}: PropertyCardProps) {
  console.log("property", property);
  const { _id, name, address, carpet_area, status, pincode, state, photos } =
    property;

  return (
    <Card className="max-w-md overflow-hidden cursor-pointer">
      <div className="relative h-48 w-full">
        <Image
          src={propertyImage || photos?.[0]}
          alt={name || "Property"}
          className="rounded-t-lg object-cover"
          fill
        />
      </div>
      <CardHeader className="space-y-1 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              {name || "Unnamed Property"}
            </h3>
            <p className="text-sm text-muted-foreground">{address}</p>
            <p className="text-sm text-muted-foreground">
              {state}, {pincode}
            </p>
            <p className="text-sm font-medium">{carpet_area} ft²</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0">
        <div className="flex items-center gap-3">
          <Badge
            variant={status === "Active" ? "default" : "secondary"}
            className={
              status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }
          >
            {status}
          </Badge>
        </div>
        <div className="space-y-2 border-t pt-4">
          <div className="text-sm text-gray-600 text-center">
            01 Jan 2024 - 31 Dec 2029
          </div>
          <div className="grid gap-1">
            <div className="text-sm">
              <span className="font-medium">Rent:</span>{" "}
              {property.cost_centre || "20,000"} p.m.
            </div>
            <div className="text-sm">
              <span className="font-medium">Security Deposit:</span> Rs.
              1,00,000
            </div>
            <div className="text-sm">
              <span className="font-medium">Lock In Till:</span> 30 Jun 2024
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t p-4">
        <Button variant="ghost" size="sm" onClick={() => onClick(_id)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
