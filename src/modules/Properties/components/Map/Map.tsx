import React, { useEffect, useState } from "react";
import BaseGoogleMap from "./components/GoogleMap";
import { Location } from "./components/GoogleMap/BaseGoogleMap";
import { useGetPropertiesForMap } from "@/hooks/property";
import { IProperty } from "@/models/Property";
import Loader from "@/components/Loader";

export type MapProps = {
  properties: Location[];
};

const Map: React.FC<MapProps> = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [getPropertiesForMap, { loading, error }] = useGetPropertiesForMap();

  const fetchProperties = async () => {
    try {
      const properties = await getPropertiesForMap();
      setProperties(properties);
    } catch (err) {
      console.error("Error fetching properties for map:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="h-[calc(100vh_-88px)] w-[100%]">
        <BaseGoogleMap properties={properties} />
      </div>
    </div>
  );
};

export default Map;
