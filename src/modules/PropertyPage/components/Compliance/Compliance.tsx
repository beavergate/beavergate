"use client";

import React, { useRef } from "react";
import { Button } from "@/ui/button";
import { useCreateCompliance } from "@/hooks/compliance";
import ComplianceEditDialog, {
  ComplianceEditDialogHandle,
} from "./components/ComplianceEditDialog";
import { ICompliance } from "@/models/Compliance";

const Compliance = ({ compliance }: { compliance: ICompliance }) => {
  const complianceEditDialogRef = useRef<ComplianceEditDialogHandle>(null);

  const [createCompliance, { loading: creating, error: createError }] =
    useCreateCompliance();

  const complianceFields = [
    { label: "Fire Compliance", value: compliance?.fire ? "Yes" : "No" },
    {
      label: "Shops and Establishment Compliance",
      value: compliance?.shops_and_establishment ? "Yes" : "No",
    },
    {
      label: "Title Clearance",
      value: compliance?.title_clearance ? "Yes" : "No",
    },
    {
      label: "Sanction Plan and Occupancy Certificate",
      value: compliance?.sanction_plan_occupancy_certificate ? "Yes" : "No",
    },
  ];

  return (
    <>
      <ComplianceEditDialog
        ref={complianceEditDialogRef}
        compliance={compliance}
        onSubmit={(data) => {
          complianceEditDialogRef.current?.close();
        }}
      />

      {compliance ? (
        <div className="flex flex-col md:flex-row p-8 rounded-lg space-y-6 md:space-y-0 md:space-x-8">
          <div className="bg-white p-6 rounded-lg shadow-md md:w-full">
            <div className="p-4 rounded relative">
              <h2 className="text-lg font-semibold">Compliance Details</h2>
              <Button
                className="absolute top-2 right-2 text-white rounded-md"
                onClick={() => {
                  complianceEditDialogRef.current?.open();
                }}
              >
                Edit
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 py-4">
                {complianceFields.map((field, index) => (
                  <p key={index}>
                    <strong>{field.label}:</strong> {field.value || "N/A"}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex p-8 rounded-lg space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md md:w-full">
            <h2 className="text-lg font-semibold mb-4">No Compliance Found</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Compliance;
