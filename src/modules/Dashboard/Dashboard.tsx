import React, { useState } from "react";
import Table from "@/components/Table";
import { Property } from "./components/types";
import getColumns from "./components/DataTableColumns";
import { customHeader } from "./components/CustomHeader";

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

const Dashboard: React.FC = () => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const columns = getColumns(setSelectedProperties);

  console.log('selectedProperties', selectedProperties)

 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Properties</h1>
      <Table data={properties} columns={columns} customHeader={customHeader} />
    </div>
  );
};

export default Dashboard;
