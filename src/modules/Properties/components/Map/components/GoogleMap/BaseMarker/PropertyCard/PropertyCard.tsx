import { IProperty } from "@/models/Property"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

type Props = {
  property: IProperty
}

const PropertyCard: React.FC<Props> = ({ property }) => {
  const router = useRouter()
  
  return (
    <Card className="w-[400px] overflow-hidden">
      <div className="relative h-[200px] w-full">
        <Image
          src={property.photos?.[0] || "https://picsum.photos/200/300"}
          alt={property.name}
          className="object-cover"
          fill
        />
      </div>
      <CardHeader className="space-y-1 p-4">
        <CardTitle className="text-xl">{property.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {property.address}
        </CardDescription>
        {property.landlords?.length > 0 && (
          <CardDescription className="text-sm text-gray-500">
            Landlord Name +{property.landlords.length}
          </CardDescription>
        )}
        <div className="text-sm text-gray-500">
          {property.carpet_area || property.super_built_up_area} ft²
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <div className="flex items-center gap-3">
          <Badge 
            variant={property.status.toLowerCase() === 'active' ? 'default' : 'secondary'}
            className="rounded-md"
          >
            {property.status}
          </Badge>
          <span className="text-sm text-gray-500">Updated Dec 5</span>
          <Button 
            variant="link" 
            className="ml-auto p-0 text-blue-600 hover:text-blue-800"
            onClick={() => router.push(`/properties/${property._id}`)}
          >
            View Listing
          </Button>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="text-sm text-gray-600">01 Jan 2024 - 31 Dec 2029</div>
          <div className="grid gap-1">
            <div className="text-sm">
              <span className="font-medium">Rent:</span> {property.cost_centre || "20,000"} p.m.
            </div>
            <div className="text-sm">
              <span className="font-medium">Security Deposit:</span> Rs. 1,00,000
            </div>
            <div className="text-sm">
              <span className="font-medium">Lock In Till:</span> 30 Jun 2024
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-blue-600 hover:text-blue-800"
          onClick={() => {
            // Handle link sharing or copying
            navigator.clipboard.writeText(`${window.location.origin}/properties/${property._id}`)
          }}
        >
          <Link2 className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PropertyCard