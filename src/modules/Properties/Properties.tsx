"use client";

import React, { useState } from "react";
import List from "./components/List";
import Map from "./components/Map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputPopover from "@/components/InputPopover";
import { Location } from "./components/Map/components/GoogleMap/BaseGoogleMap";
import { useCreateProperty } from "@/hooks/property";
import { useGeocodeAddresses } from "@/hooks/geocode";

const Properties: React.FC = () => {
  const [createProperty] = useCreateProperty();
  const [jsonData, setJsonData] = useState<Location[]>([]);
  const [properties, setProperties] = useState<any>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [geocodeAddresses] = useGeocodeAddresses();

  const fetchGeocodeData = async (addresses: any) => {
    try {
      const response = await geocodeAddresses(addresses);
      if (response.status === 200) {
        const geocodedData = response.data;
        // Handle the geocoded data
      } else {
        console.error("Failed to fetch geocode data");
      }
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  const handleJsonData = async (data: Location[]) => {
    setJsonData(data);

    try {
      const udpatedData = await fetchGeocodeData([data[0]]);
      const response = await createProperty(udpatedData[0]);
      setProperties(response.data.data);
    } catch (e) {
      console.error("Error creating property:", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <InputPopover
        setFiles={setFiles}
        files={files}
        handleJsonData={handleJsonData}
      />
      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <List data={properties} />
        </TabsContent>
        <TabsContent value="map">
          <Map locations={properties} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Properties;
