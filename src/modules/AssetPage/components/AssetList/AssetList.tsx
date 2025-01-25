"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import {
  useAssignAsset,
  useGetAllAssets,
  useTransferAsset,
} from "@/hooks/asset";
import { Asset } from "modules/AssetPage/types";
import CustomHeader from "./components/CustomHeader";
import { Button } from "@/ui/button";

const AssetsList: React.FC = () => {
  const router = useRouter();

  const {
    state: { assets },
  } = useGlobalState(); // Update your global state to support assets
  const [getAllAssets, { loading }] = useGetAllAssets();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [assignAsset] = useAssignAsset();
  const [transferAsset] = useTransferAsset();
  const fetchAssets = async ({ page = 1 }) => {
    try {
      const res = await getAllAssets();
      console.log("assets", res);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error fetching assets:", err);
    }
  };

  useEffect(() => {
    fetchAssets({ page: 1 });
  }, []);

  const onPageChange = (page: number) => {
    fetchAssets({ page });
    setCurrentPage(page);
  };

  const handleAssign = async (asset: Asset) => {
    try {
      // For demonstration, we're using placeholder values. You should replace these with actual user input or data.
      const result = await assignAsset({
        asset_id: asset._id,
        email: "user@example.com",
        uid: "user123",
      });
      console.log("Asset assigned:", result);
      // Optionally, refresh the assets list or update the local state
      fetchAssets({ page: currentPage });
    } catch (error) {
      console.error("Error assigning asset:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleTransfer = async (asset: Asset) => {
    try {
      // For demonstration, we're using a placeholder email. You should replace this with actual user input.
      const result = await transferAsset({
        transferedEmail: "newuser@example.com",
        assetId: asset._id,
      });
      console.log("Asset transferred:", result);
      // Optionally, refresh the assets list or update the local state
      fetchAssets({ page: currentPage });
    } catch (error) {
      console.error("Error transferring asset:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const columns: ColumnDef<Asset, any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: "asset_tag",
      header: "Asset Tag",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.asset_tag}</div>
      ),
    },
    {
      accessorKey: "serial_no",
      header: "Serial No",
      cell: ({ row }) => <div>{row.original.serial_no}</div>,
    },
    {
      accessorKey: "model_no",
      header: "Model No",
      cell: ({ row }) => <div>{row.original.model_no}</div>,
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: ({ row }) => <div>₹{row.original.cost}</div>,
    },
    {
      accessorKey: "issued_date",
      header: "Issued Date",
      cell: ({ row }) => (
        <div>
          {row.original.issued_date
            ? new Date(row.original.issued_date).toLocaleDateString()
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "return_date",
      header: "Return Date",
      cell: ({ row }) => (
        <div>
          {row.original.return_date
            ? new Date(row.original.return_date).toLocaleDateString()
            : "-"}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const asset = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAssign(asset);
              }}
              size="sm"
              className="h-8 px-3 text-xs"
            >
              Assign
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleTransfer(asset);
              }}
              size="sm"
              className="h-8 px-3 text-xs"
            >
              Transfer
            </Button>
          </div>
        );
      },
    },
  ];

  const handleRowClick = (data: any) => {
    router.push(`/assets/${data?._id}`); // Adjust the URL as per your route
  };

  console.log("assets", assets);

  return (
    <div className="container mx-auto p-0">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Assets</h1>
      </div>
      <Table
        data={assets}
        columns={columns as any}
        pagination={{ page: currentPage, total: totalPages, onPageChange }}
        customHeader={<CustomHeader data={assets} />}
        handleRowClick={handleRowClick}
        loading={loading} // Pass loading prop here
      />
    </div>
  );
};

export default AssetsList;
