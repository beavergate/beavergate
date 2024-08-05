// src/components/List.tsx
"use client";
import React, { useEffect, useState } from "react";
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
import { useGlobalState } from "@/context/GlobalStateContext";
import { useGetPropertiesByUserId } from "@/hooks/property";

const List: React.FC = () => {
  const router = useRouter();

  const {
    state: { properties },
    actions: { setProperties },
  } = useGlobalState();
  const [getPropertiesByUserId, { loading }] = useGetPropertiesByUserId();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProperties = async ({ page = 1 }) => {
    try {
      const { properties, totalPages } = await getPropertiesByUserId({
        page,
      });
      setProperties(properties);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };
  useEffect(() => {
    fetchProperties({ page: 1 });
  }, []);

  const onPageChange = (page: number) => {
    fetchProperties({ page });
    setCurrentPage(page);
  };

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
      cell: ({ row }) => <div>{row.original.carpet_area}</div>,
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
      cell: ({ row }) => <div>{row.original.super_built_up_area}</div>,
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
    router.push(`/properties/${data?._id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Properties</h1>
      <Table
        data={properties}
        columns={columns as any}
        pagination={{ page: currentPage, total: totalPages, onPageChange }}
        customHeader={<CustomHeader data={properties} />}
        handleRowClick={handleRowClick}
        loading={loading} // Pass loading prop here
      />
    </div>
  );
};

export default List;
