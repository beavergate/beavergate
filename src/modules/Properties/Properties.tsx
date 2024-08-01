"use client";

import React, { useEffect, useState } from "react";
import List from "./components/List";
import Map from "./components/Map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputPopover from "@/components/InputPopover";
import {
  useCreateFullProperty,
  useCreateProperty,
  useGetPropertiesByUserId,
} from "@/hooks/property";
import { useGeocodeAddresses } from "@/hooks/geocode";
import { useGlobalState } from "@/context/GlobalStateContext";
import { get } from "lodash";
import { Session } from "next-auth";

const Properties = ({ session }: { session: Session | null }) => {
  const {
    state: { properties },
    actions: { setProperties },
  } = useGlobalState();
  console.log("properties", properties);
  const user = get(session, "user", null);
  console.log("user", user);
  const [createProperty] = useCreateProperty();
  const [createFullProperty] = useCreateFullProperty();
  const [files, setFiles] = useState<File[]>([]);
  const [geocodeAddresses] = useGeocodeAddresses();
  const [getPropertiesByUserId] = useGetPropertiesByUserId();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (user?._id) {
          const data = await getPropertiesByUserId(user?._id);
          setProperties(data);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
      }
    };

    fetchProperty();
  }, []);

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
  const handleData = async (data: any) => {
    try {
      // const updatedData = await fetchGeocodeData(
      //   data.map((d: any) => d.property)
      // );
      const createPromises = data.map((item: any) => createFullProperty(item));
      const responses = await Promise.all(createPromises);
      const newProperties = responses.map((response: any) => response.data);
      setProperties([...properties, ...newProperties]);
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
        type="all"
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
