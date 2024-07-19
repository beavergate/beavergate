import React, { useState } from "react";
import Table from "@/components/Table";
import { Property } from "../../types";
import CustomHeader from "./components/CustomHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

type ListProp = {
  data: Property[];
};

const List: React.FC<ListProp> = ({ data }) => {

  const router = useRouter()

  const columns: ColumnDef<Property, any>[] = [
    {
      accessorKey: "name",
      header: "Name of Property",
      cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.status}</div>
      ),
    },
    // {
    //   accessorKey: "photo",
    //   header: "Photo",
    //   cell: ({ row }) => (
    //     <div>
    //       <img
    //         src={row.original.photo}
    //         alt={row.original.name}
    //         className="h-10 w-10"
    //       />
    //     </div>
    //   ),
    // },

    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <div>{row.original.address}</div>,
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => <div>{row.original.state}</div>,
    },
    {
      accessorKey: "pincode",
      header: "Pincode",
      cell: ({ row }) => <div>{row.original.pincode}</div>,
    },

    {
      accessorKey: "carpetArea",
      header: () => (
        <Tooltip>
          <TooltipTrigger>
            <div>Carpet Area ⓘ</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Carpet Area is the area enclosed within the walls.</p>
          </TooltipContent>
        </Tooltip>
      ),
      cell: ({ row }) => <div>{row.original.carpetArea}</div>,
    },

    {
      accessorKey: "superBuiltUpArea",
      header: () => (
        <Tooltip>
          <TooltipTrigger>
            <div>Super Built Up Area ⓘ</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Super Built Up Area includes the carpet area plus the area
              occupied by the walls, and the area occupied by common/shared
              construction.
            </p>
          </TooltipContent>
        </Tooltip>
      ),
      cell: ({ row }) => <div>{row.original.superBuiltUpArea}</div>,
    },

    {
      accessorKey: "latitude",
      header: "Latitude",
      cell: ({ row }) => <div>{row.original.latitude}</div>,
    },
    {
      accessorKey: "longitude",
      header: "Longitude",
      cell: ({ row }) => <div>{row.original.longitude}</div>,
    },
  ];

  const handleRowClick = (data: any) => {
    router.push(`/properties/${data?._id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Properties</h1>
      <Table
        data={data}
        columns={columns as any}
        customHeader={<CustomHeader />}
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

export default List;
