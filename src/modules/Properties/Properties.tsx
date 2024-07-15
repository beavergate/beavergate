"use client";

import React, { useState } from "react";
import List from "./components/List";
import Map from "./components/Map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputPopover from "@/components/InputPopover";
import { Location } from "./components/Map/components/GoogleMap/BaseGoogleMap";
import { useCreateProperty } from "@/hooks/property";
import { useGeocodeAddresses } from "@/hooks/geocode";
import { useCreateLandlord } from "@/hooks/landlord";
import { useCreateCompliance } from "@/hooks/compliance";
import { useCreateCommericial } from "@/hooks/commercial";
import { useCreateUtility } from "@/hooks/utility";

const Properties: React.FC = () => {
  const [createProperty] = useCreateProperty();
  const [createLandlord] = useCreateLandlord();
  const [createCompliance] = useCreateCompliance();
  const [createCommericial] = useCreateCommericial();
  const [createUtility] = useCreateUtility();
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
  const handleData = async (data: Location[]) => {
    try {
      const updatedData = await fetchGeocodeData(data);
      const createPromises = updatedData.map((item: any) =>
        createProperty(item)
      );
      const responses = await Promise.all(createPromises);
      const newProperties = responses.map((response: any) => response.data);
      setProperties((prevProperties: any) => [
        ...prevProperties,
        ...newProperties,
      ]);
    } catch (e) {
      console.error("Error creating property:", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <InputPopover
        onFilesChange={(files) => setFiles(files)}
        files={files}
        handleData={handleData}
        type="property"
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
