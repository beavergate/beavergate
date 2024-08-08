"use client";

import React, { useRef } from "react";
import { Button } from "@/ui/button";
import CommercialEditDialog, {
  CommercialEditDialogHandle,
} from "./components/CommercialEditDialog";
// import CommercialAddDialog, {
//   CommercialAddDialogHandle,
// } from "./components/CommercialAddDialog";
import { ICommercial } from "@/models/Commercial";

const Commercial = ({ commercial }: { commercial: ICommercial }) => {
  const commercialEditDialogRef = useRef<CommercialEditDialogHandle>(null);
  // const addCommercialDialogRef = useRef<CommercialAddDialogHandle>(null);

  // const [createCommercial, { loading: creating, error: createError }] =
  //   useCreateCommericial();

  // const handleAddCommercial = async (data: any) => {
  //   try {
  //     const response = await createCommercial(data);
  //     if (response) {
  //       console.log("Commercial property created:", response.data);
  //     }
  //   } catch (err) {
  //     console.error("Error creating commercial property:", err);
  //   }
  // };

  // Array of commercial fields to display
  const commercialFields = [
    { label: "Rent", value: commercial?.rent },
    { label: "Security Deposit", value: commercial?.security_deposit },
    {
      label: "Start Date",
      value: commercial?.start_date
        ? new Date(commercial.start_date).toLocaleDateString()
        : "",
    },
    {
      label: "End Date",
      value: commercial?.end_date
        ? new Date(commercial.end_date).toLocaleDateString()
        : "",
    },
    { label: "Lockin Period", value: commercial?.lockin },
    { label: "Notice Period", value: commercial?.notice_period },
    {
      label: "Rent Payment Date",
      value: commercial?.rent_payment_date
        ? new Date(commercial.rent_payment_date).toLocaleDateString()
        : "",
    },
    {
      label: "Rent Payment Frequency",
      value: commercial?.rent_payment_frequency,
    },
    { label: "Escalation Clause", value: commercial?.escalation_clause },
    { label: "Deductibles", value: commercial?.deductibles },
    { label: "Rent Free Period", value: commercial?.rent_free_period },
    {
      label: "Delayed Payments Interest",
      value: commercial?.delayed_payments_interest,
    },
    { label: "Lesser Scope of Work", value: commercial?.lesser_scope_of_work },
    { label: "Lessee Scope of Work", value: commercial?.lessee_scope_of_work },
    { label: "Tenure", value: commercial?.tenure },
  ];

  return (
    <>
      <CommercialEditDialog
        ref={commercialEditDialogRef}
        commercial={commercial}
        onSubmit={(data) => {
          commercialEditDialogRef.current?.close();
        }}
      />
      {/* <CommercialAddDialog
        ref={addCommercialDialogRef}
        onSubmit={(data) => {
          addCommercialDialogRef.current?.close();
        }}
      /> */}

      {commercial ? (
        <div className="flex flex-col md:flex-row p-8 rounded-lg space-y-6 md:space-y-0 md:space-x-8">
          <div className="bg-white p-6 rounded-lg shadow-md md:w-full">
            <div className="p-4 rounded relative">
              <h2 className="text-lg font-semibold">Commercial Details</h2>
              <Button
                className="absolute top-2 right-2 text-white rounded-md"
                onClick={() => {
                  commercialEditDialogRef.current?.open();
                }}
              >
                Edit
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 py-4">
                {commercialFields.map((field, index) => (
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
            <h2 className="text-lg font-semibold mb-4">No Commercials Found</h2>
            {/* <Button
              onClick={() => {
                addCommercialDialogRef.current?.open();
              }}
              className="text-white rounded-md"
            >
              Add Commercial Property
            </Button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Commercial;
