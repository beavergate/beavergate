"use client";

import React, { useEffect, useState } from "react";
import List from "./components/List";
import Map from "./components/Map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Session } from "next-auth";

const Properties = ({ session }: { session: Session | null }) => {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <List />{" "}
        </TabsContent>
        <TabsContent value="map">
          <Map />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Properties;
