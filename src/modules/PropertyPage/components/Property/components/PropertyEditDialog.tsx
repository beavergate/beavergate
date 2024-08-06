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

const propertySchema = z.object({
  status: z.enum(["Active", "Inactive"]),
  address: z.string().nonempty("Address is required"),
  latitude: z.union([
    z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
      .nullable(),
    z.number().nullable(),
  ]),
  longitude: z.union([
    z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
      .nullable(),
    z.number().nullable(),
  ]),
  carpet_area: z.union([
    z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
      .nullable(),
    z.number().nullable(),
  ]),
  super_built_up_area: z.union([
    z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Must be a number")
      .nullable(),
    z.number().nullable(),
  ]),
  pincode: z.string().nonempty("Pincode is required"),
  state: z.string().nonempty("State is required"),
  cost_centre: z.string().nullable(),
});

type PropertySchema = z.infer<typeof propertySchema>;

export interface PropertyEditDialogProps {
  property: PropertySchema;
  onSubmit: (data: PropertySchema) => void;
}

export interface PropertyEditDialogHandle {
  open: () => void;
  close: () => void;
}

const PropertyEditDialog = forwardRef<
  PropertyEditDialogHandle,
  PropertyEditDialogProps
>(({ property, onSubmit }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const form = useForm<PropertySchema>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      ...property,
      latitude: property.latitude ?? "",
      longitude: property.longitude ?? "",
      carpet_area: property.carpet_area ?? "",
      super_built_up_area: property.super_built_up_area ?? "",
      cost_centre: property.cost_centre ?? "",
    },
  });

  const convertNullToEmptyString = (value: any) =>
    value === null ? "" : value;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Property Details</DialogTitle>
          <DialogDescription>
            Make changes to the property details and click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
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
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
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
                name="carpet_area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carpet Area</FormLabel>
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
                name="super_built_up_area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Super Built-up Area</FormLabel>
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
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost_centre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Centre</FormLabel>
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

PropertyEditDialog.displayName = "PropertyEditDialog";

export default PropertyEditDialog;
