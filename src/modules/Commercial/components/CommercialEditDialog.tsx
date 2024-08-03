/* eslint-disable react/no-unescaped-entities */
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";

const commercialSchema = z.object({
  rent: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a number"),
  security_deposit: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a number"),
  start_date: z.string().nonempty("Start date is required"),
  end_date: z.string().nonempty("End date is required"),
  lockin: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
    .nullable(),
  notice_period: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
    .nullable(),
  rent_payment_date: z.string().nullable(),
  rent_payment_frequency: z.string().nullable(),
  escalation_clause: z.string().nullable(),
  deductibles: z.string().nullable(),
  rent_free_period: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
    .nullable(),
  delayed_payments_interest: z.string().nullable(),
  lesser_scope_of_work: z.string().nullable(),
  lessee_scope_of_work: z.string().nullable(),
  tenure: z.string().nullable(),
});

type CommercialSchema = z.infer<typeof commercialSchema>;

export interface CommercialEditDialogProps {
  commercial: CommercialSchema;
  onSubmit: (data: CommercialSchema) => void;
}

export interface CommercialEditDialogHandle {
  open: () => void;
  close: () => void;
}

const CommercialEditDialog = forwardRef<
  CommercialEditDialogHandle,
  CommercialEditDialogProps
>(({ commercial, onSubmit }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const form = useForm<CommercialSchema>({
    resolver: zodResolver(commercialSchema),
    defaultValues: {
      ...commercial,
    },
  });

  const convertNullToEmptyString = (value: any) =>
    value === null ? "" : value;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Commercial Property Details</DialogTitle>
          <DialogDescription>
            Make changes to the commercial property details and click save when
            you're done.
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
                      <Input
                        type="number"
                        {...field}
                        value={convertNullToEmptyString(field.value)}
                      />
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
                      <Input
                        type="number"
                        {...field}
                        value={convertNullToEmptyString(field.value)}
                      />
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
              <FormField
                control={form.control}
                name="lockin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lockin Period</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={convertNullToEmptyString(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notice_period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice Period</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={convertNullToEmptyString(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rent_payment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent Payment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={convertNullToEmptyString(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rent_payment_frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent Payment Frequency</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={convertNullToEmptyString(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="escalation_clause"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escalation Clause</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={convertNullToEmptyString(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deductibles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deductibles</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={convertNullToEmptyString(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rent_free_period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent Free Period</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={convertNullToEmptyString(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="delayed_payments_interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delayed Payments Interest</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={convertNullToEmptyString(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lesser_scope_of_work"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesser Scope of Work</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={convertNullToEmptyString(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lessee_scope_of_work"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lessee Scope of Work</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={convertNullToEmptyString(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tenure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenure</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={convertNullToEmptyString(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

CommercialEditDialog.displayName = "CommercialEditDialog";

export default CommercialEditDialog;
