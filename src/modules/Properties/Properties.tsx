"use client";

import React, { useState } from "react";
import List from "./components/List";
import Map from "./components/Map";
import { Property } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputPopover from "@/components/InputPopover";
import { Location } from "./components/Map/components/GoogleMap/BaseGoogleMap";
import { useCreateProperty } from "@/hooks/property";

const Properties: React.FC = () => {
  const [createProperty] = useCreateProperty();
  const [jsonData, setJsonData] = useState<Location[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const headers = jsonData[0];
  const propertiesData = jsonData.slice(1);

  const properties: Property[] = [
    {
      id: "P001",
      status: "Draft",
      photo: "https://picsum.photos/200/300",
      name: "Sample Property",
      address: "1234 Sample Street",
      latitude: "40.7128",
      longitude: "-74.0060",
      carpetArea: "1200 sq ft",
      superBuiltUpArea: "1500 sq ft",
      pincode: "10001",
      state: "New York",
    },
    // Add more property objects as needed
  ];

  const handleJsonData = async (data: Location[]) => {
    setJsonData(data);

    try {
      await createProperty(data);
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
          <Map locations={propertiesData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Properties;
