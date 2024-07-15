import React, { useEffect, useState } from "react";
import { useGetPropertyById } from "@/hooks/property";

const Property = ({ id }: { id: string }) => {
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
    <div>
      <h1>{property.name}</h1>
      <p>{property.description}</p>
      {/* Add more property details here */}
    </div>
  );
};

export default Property;
