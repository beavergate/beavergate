"use client";

import React, { useRef } from "react";
import { Button } from "@/ui/button";
import UtilityEditDialog, {
  UtilityEditDialogHandle,
} from "./components/UtilityEditDialog";
import { IUtility } from "@/models/Utility";

const Utility = ({ utility }: { utility: IUtility }) => {
  const utilityEditDialogRef = useRef<UtilityEditDialogHandle>(null);

  const utilityFields = [
    { label: "Electricity Board", value: utility?.electricity_board || "N/A" },
    {
      label: "Electricity Consumer Number",
      value: utility?.electricity_consumer_number || "N/A",
    },
    {
      label: "Electricity Bill Amount",
      value: utility?.electricity_bill_amount ? `$${utility.electricity_bill_amount}` : "N/A",
    },
    { label: "Water Board", value: utility?.water_board || "N/A" },
    {
      label: "Water Consumer Number",
      value: utility?.water_consumer_number || "N/A",
    },
    {
      label: "Water Bill Amount",
      value: utility?.water_bill_amount ? `$${utility.water_bill_amount}` : "N/A",
    },
    { label: "Type", value: utility?.type || "N/A" },
  ];

  return (
    <>
      <UtilityEditDialog
        ref={utilityEditDialogRef}
        utility={utility}
        onSubmit={(data) => {
          utilityEditDialogRef.current?.close();
          // Add your update logic here
          console.log("Updated utility data:", data);
        }}
      />

      {utility ? (
        <div className="flex flex-col md:flex-row p-8 rounded-lg space-y-6 md:space-y-0 md:space-x-8">
          <div className="bg-white p-6 rounded-lg shadow-md md:w-full">
            <div className="p-4 rounded relative">
              <h2 className="text-lg font-semibold">Utility Details</h2>
              <Button
                className="absolute top-2 right-2 text-white rounded-md"
                onClick={() => {
                  utilityEditDialogRef.current?.open();
                }}
              >
                Edit
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 py-4">
                {utilityFields.map((field, index) => (
                  <p key={index}>
                    <strong>{field.label}:</strong> {field.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex p-8 rounded-lg space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md md:w-full">
            <h2 className="text-lg font-semibold mb-4">No Utility Found</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Utility;
