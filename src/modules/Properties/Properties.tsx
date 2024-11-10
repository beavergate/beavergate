"use client";

import React, { useEffect, useState } from "react";
import List from "./components/List";
import Map from "./components/Map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Session } from "next-auth";
import FilterBar from "@/components/FilterBar";
import Grid from "./components/Grid";
type Status = "all" | "active" | "off-market" | "draft";
type View = "grid" | "list" | "map";
type SortOption = "newest" | "oldest";

const Properties = ({ session }: { session: Session | null }) => {
  const [status, setStatus] = useState<Status>("all");
  const [view, setView] = useState<View>("list");
  const [sort, setSort] = useState<SortOption>("newest");

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
    // You might want to trigger a refetch of properties here
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    // You might want to trigger a re-sort of properties here
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Properties</h1>

      <FilterBar
        status={status}
        view={view}
        sort={sort}
        onStatusChange={handleStatusChange}
        onViewChange={handleViewChange}
        onSortChange={handleSortChange}
      />
      {view === "list" && <List />}
      {view === "map" && <Map />}
      {view === "grid" && <Grid />}
    </div>
  );
};

export default Properties;
