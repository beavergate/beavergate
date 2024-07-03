import React, { useState } from "react";
import Table from "@/components/Table";
import { Property } from "../../types";
import getColumns from "./components/DataTableColumns";
import { ColumnDef } from "@tanstack/react-table";
import CustomHeader from "./components/CustomHeader";

type ListProp = {
  data: Property[];
};

const List: React.FC<ListProp> = ({ data }) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const columns = getColumns(setSelectedProperties) as ColumnDef<object, any>[];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Properties</h1>
      <Table data={data} columns={columns} customHeader={<CustomHeader />} />
    </div>
  );
};

export default List;
