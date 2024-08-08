/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
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
import { IUtility } from "@/models/Utility";

const utilitySchema = z.object({
  electricity_board: z.string().optional(),
  electricity_consumer_number: z.string().optional(),
  electricity_bill_amount: z.union([
    z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
      .nullable(),
    z.number().nullable(),
  ]),
  water_board: z.string().optional(),
  water_consumer_number: z.string().optional(),
  water_bill_amount: z.union([
    z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
      .nullable(),
    z.number().nullable(),
  ]),
  type: z.string().nonempty("Type is required"),
});

type UtilitySchema = z.infer<typeof utilitySchema>;

export interface UtilityEditDialogProps {
  utility: IUtility;
  onSubmit: (data: UtilitySchema) => void;
}

export interface UtilityEditDialogHandle {
  open: () => void;
  close: () => void;
}

const UtilityEditDialog = forwardRef<
  UtilityEditDialogHandle,
  UtilityEditDialogProps
>(({ utility, onSubmit }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const form = useForm<UtilitySchema>({
    resolver: zodResolver(utilitySchema),
    defaultValues: {
      ...utility,
    },
  });

  const convertNullToEmptyString = (value: any) =>
    value === null || value === undefined ? "" : value;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Utility Details</DialogTitle>
          <DialogDescription>
            Make changes to the utility details and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="electricity_board"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Electricity Board</FormLabel>
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
                name="electricity_consumer_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Electricity Consumer Number</FormLabel>
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
                name="electricity_bill_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Electricity Bill Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value === null ? "" : String(field.value)}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? null
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="water_board"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Board</FormLabel>
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
                name="water_consumer_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Consumer Number</FormLabel>
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
                name="water_bill_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Bill Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value === null ? "" : String(field.value)}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? null
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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

UtilityEditDialog.displayName = "UtilityEditDialog";

export default UtilityEditDialog;
