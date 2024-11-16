"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { ILandlord } from "@/models/Landlord";

const parseLandlords = ([data]: any) => {
  const names = data?.name?.split(", ");
  if (names?.length === 1) {
    return [data]; // Return data as a single landlord object if no comma is found
  }
  const bankNames = data?.bank_name?.split(", ");
  const bankAccountNumbers = data?.bank_account_number?.split(", ");
  const bankIfsc = data?.bank_ifsc?.split(", ");
  const pans = data?.pan?.split(", ");
  const aadhaarCardNumbers = data?.aadhaar_card_number?.split(", ");
  const contactEmails = data?.contact_email?.split(", ");
  const contactNumbers = data?.contact_number?.split(", ");
  const gstins = data?.gstin?.split(", ");
  const landlordAddresses = data?.landlord_registered_address?.split(", ");
  const aadhaarCardAttachments = data?.aadhaar_card_attachment?.split(", ");
  const panAttachments = data?.pan_attachment?.split(", ");

  return names?.map((name: any, index: any) => ({
    name,
    bank_name: bankNames[index] || "",
    bank_account_number: bankAccountNumbers[index] || "",
    bank_ifsc: bankIfsc[index] || "",
    pan: pans[index] || "",
    aadhaar_card_number: aadhaarCardNumbers[index] || "",
    contact_email: contactEmails[index] || "",
    contact_number: contactNumbers[index] || "",
    gstin: gstins[index] || "",
    landlord_registered_address: landlordAddresses[index] || "",
    aadhaar_card_attachment: aadhaarCardAttachments[index] || "",
    pan_attachment: panAttachments[index] || "",
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
    vendor_code: data?.vendor_code,
  }));
};

//changes

const Landlord = ({ landlordsData }: { landlordsData: ILandlord[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [landlords, setLandlords] = useState<ILandlord[]>([]);
  useEffect(() => {
    if (landlordsData) {
      const parsedLandlords = parseLandlords(landlordsData);
      setLandlords(parsedLandlords);
    }
  }, [landlordsData]);

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
    router.push(`${pathname}/landlords/${data?._id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Landlords</h1>
      <Table
        data={landlords}
        columns={columns as any}
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

export default Landlord;
