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
import { useGetLandlordByPropertyId } from "@/hooks/landlord";
import { ILandlord } from "@/models/Landlord";

const Landlord = ({ landlords }: { landlords: ILandlord[] }) => {
  const router = useRouter();

  const [getLandlordByPropertyId, { loading }] = useGetLandlordByPropertyId();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const fetchLandlords = async ({ page = 1 }) => {
  //   try {
  //     // Assume getLandlordByPropertyId accepts a page parameter for pagination
  //     const { landlords, totalPages } = await getLandlordByPropertyId(id);
  //     setTotalPages(totalPages);
  //   } catch (err) {
  //     console.error("Error fetching landlords:", err);
  //   }
  // };

  useEffect(() => {
    // fetchLandlords({ page: 1 });
  }, []);

  const onPageChange = (page: number) => {
    // fetchLandlords({ page });
    setCurrentPage(page);
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: "contactEmail",
      header: "Contact Email",
      cell: ({ row }) => <div>{row.original.contact_email}</div>,
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      cell: ({ row }) => <div>{row.original.contact_number}</div>,
    },
    {
      accessorKey: "pan",
      header: "PAN",
      cell: ({ row }) => <div>{row.original.pan}</div>,
    },
    {
      accessorKey: "aadhaarCardNumber",
      header: "Aadhaar Number",
      cell: ({ row }) => <div>{row.original.aadhaar_card_number}</div>,
    },
    {
      accessorKey: "gstin",
      header: "GSTIN",
      cell: ({ row }) => <div>{row.original.gstin}</div>,
    },
    {
      accessorKey: "bankName",
      header: "Bank Name",
      cell: ({ row }) => <div>{row.original.bank_name}</div>,
    },
    {
      accessorKey: "bankAccountNumber",
      header: "Bank Account",
      cell: ({ row }) => <div>{row.original.bank_account_number}</div>,
    },
    {
      accessorKey: "landlordRegisteredAddress",
      header: () => (
        <Tooltip>
          <TooltipTrigger>
            <div>Registered Address ⓘ</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is the registered address of the landlord.</p>
          </TooltipContent>
        </Tooltip>
      ),
      cell: ({ row }) => <div>{row.original.landlord_registered_address}</div>,
    },
  ];

  const handleRowClick = (data: any) => {
    router.push(`/landlords/${data?._id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Landlords</h1>
      <Table
        data={landlords}
        columns={columns as any}
        handleRowClick={handleRowClick}
        loading={loading}
      />
    </div>
  );
};

export default Landlord;
