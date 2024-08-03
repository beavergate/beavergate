// components/AddCommercialDialog.tsx
"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const commercialSchema = z.object({
  rent: z.string().min(0, "Rent must be a positive number"),
  security_deposit: z
    .string()
    .min(0, "Security Deposit must be a positive number"),
  start_date: z.string().nonempty("Start Date is required"),
  end_date: z.string().nonempty("End Date is required"),
  lockin: z.number().min(0).nullable(),
  notice_period: z.number().min(0).nullable(),
  rent_payment_date: z.string().nullable(),
  rent_payment_frequency: z.string().nullable(),
  escalation_clause: z.string().nullable(),
  deductibles: z.string().nullable(),
  rent_free_period: z.number().min(0).nullable(),
  delayed_payments_interest: z.string().nullable(),
  lesser_scope_of_work: z.string().nullable(),
  lessee_scope_of_work: z.string().nullable(),
  tenure: z.string().nullable(),
});

type CommercialSchema = z.infer<typeof commercialSchema>;

export interface CommercialAddDialog {
  onSubmit: (data: CommercialSchema) => void;
}

export interface CommercialAddDialogHandle {
  open: () => void;
  close: () => void;
}

const CommercialAddDialog = forwardRef<
  CommercialAddDialogHandle,
  CommercialAddDialog
>(({ onSubmit }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => {
      form.reset();
      setIsOpen(false);
    },
  }));
  const form = useForm<CommercialSchema>({
    resolver: zodResolver(commercialSchema),
    defaultValues: {
      rent: "",
      security_deposit: "",
      start_date: "",
      end_date: "",
      lockin: null,
      notice_period: null,
      rent_payment_date: null,
      rent_payment_frequency: "",
      escalation_clause: "",
      deductibles: "",
      rent_free_period: null,
      delayed_payments_interest: "",
      lesser_scope_of_work: "",
      lessee_scope_of_work: "",
      tenure: "",
    },
  });

 

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        setIsOpen(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Commercial Property</DialogTitle>
          <DialogDescription>
            Fill in the details of the new commercial property and click save
            when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="security_deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Deposit</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Add other fields similarly */}
              {/* <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property ID</FormLabel>
                    <FormControl>
                      <Input type="text" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

CommercialAddDialog.displayName = "CommercialAddDialog";

export default CommercialAddDialog;
