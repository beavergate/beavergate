// src/app/commercials/Commercial.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCreateCommericial,
  useGetCommercialByPropertyId,
} from "@/hooks/commercial";
import CommercialEditDialog, {
  CommercialEditDialogHandle,
} from "./components/CommercialEditDialog";
import CommercialAddDialog, {
  CommercialAddDialogHandle,
} from "./components/CommercialAddDialog";

const Commercial = ({ id }: { id: string }) => {
  const router = useRouter();
  const commercialEditDialogRef = useRef<CommercialEditDialogHandle>(null);
  const addCommercialDialogRef = useRef<CommercialAddDialogHandle>(null);
  const [getCommercialById, { loading, error }] =
    useGetCommercialByPropertyId();
  const [createCommercial, { loading: creating, error: createError }] =
    useCreateCommericial();

  const [commercial, setCommercial] = useState<any>(null);

  useEffect(() => {
    const fetchCommercial = async () => {
      try {
        const data = await getCommercialById(id);
        if (data?.success) {
          setCommercial(data);
        }
      } catch (err) {
        console.error("Error fetching commercial property:", err);
      }
    };

    fetchCommercial();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddCommercial = async (data: any) => {
    try {
      const response = await createCommercial(data);
      if (response) {
        setCommercial(response.data);
        console.log("Commercial property created:", response.data);
      }
    } catch (err) {
      console.error("Error creating commercial property:", err);
    }
  };

  return (
    <>
      {commercial ? (
        <CommercialEditDialog
          ref={commercialEditDialogRef}
          commercial={commercial}
          onSubmit={() => {}}
        />
      ) : (
        <CommercialAddDialog
          ref={addCommercialDialogRef}
          onSubmit={(data) => {
            handleAddCommercial({ ...data, property: id });
          }}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        {/* Add other header elements here if needed */}
      </div>
      {commercial ? (
        <div className="bg-gray-100 p-4 rounded relative">
          <h2 className="text-lg font-semibold">Commercial Details</h2>
          <Button
            className="absolute top-2 right-2 text-white rounded-md"
            onClick={() => {
              commercialEditDialogRef.current?.open();
            }}
          >
            Edit
          </Button>
          <p>Rent: {commercial.rent}</p>
          <p>Security Deposit: {commercial.security_deposit}</p>
          <p>
            Start Date: {new Date(commercial.start_date).toLocaleDateString()}
          </p>
          <p>End Date: {new Date(commercial.end_date).toLocaleDateString()}</p>
          <p>Lockin Period: {commercial.lockin}</p>
          <p>Notice Period: {commercial.notice_period}</p>
          <p>
            Rent Payment Date:{" "}
            {new Date(commercial.rent_payment_date).toLocaleDateString()}
          </p>
          <p>Rent Payment Frequency: {commercial.rent_payment_frequency}</p>
          <p>Escalation Clause: {commercial.escalation_clause}</p>
          <p>Deductibles: {commercial.deductibles}</p>
          <p>Rent Free Period: {commercial.rent_free_period}</p>
          <p>
            Delayed Payments Interest: {commercial.delayed_payments_interest}
          </p>
          <p>Lesser Scope of Work: {commercial.lesser_scope_of_work}</p>
          <p>Lessee Scope of Work: {commercial.lessee_scope_of_work}</p>
          <p>Tenure: {commercial.tenure}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">
            No Commercial Property Found
          </h2>
          <Button
            onClick={() => {
              addCommercialDialogRef.current?.open();
            }}
            className="text-white rounded-md"
          >
            Add Commercial Property
          </Button>
        </div>
      )}
      {/* Add other sections here if needed */}
    </>
  );
};

export default Commercial;
