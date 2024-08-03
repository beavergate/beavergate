"use client";

import React, { useEffect, useState } from "react";
import List from "./components/List";
import Map from "./components/Map";
import Pagination from "components/Pagination"; // Import Pagination component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetPropertiesByUserId,
} from "@/hooks/property";
import { useGlobalState } from "@/context/GlobalStateContext";
import { get } from "lodash";
import { Session } from "next-auth";

const Properties = ({ session }: { session: Session | null }) => {
  const {
    state: { properties },
    actions: { setProperties },
  } = useGlobalState();
  const user = get(session, "user", null);
  const [getPropertiesByUserId, { loading }] = useGetPropertiesByUserId();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (user?._id) {
          const { properties, totalPages } = await getPropertiesByUserId(user._id, currentPage);
          setProperties(properties);
          setTotalPages(totalPages);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchProperties();
  }, [currentPage, user?._id]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <List data={properties} loading={loading} /> {/* Pass loading prop here */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </TabsContent>
        <TabsContent value="map">
          <Map locations={properties} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Properties;
