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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ICompliance } from "@/models/Compliance";

const complianceSchema = z.object({
  fire: z.boolean(),
  shops_and_establishment: z.boolean(),
  title_clearance: z.boolean(),
  sanction_plan_occupancy_certificate: z.boolean(),
});

type ComplianceSchema = z.infer<typeof complianceSchema>;

export interface ComplianceEditDialogProps {
  compliance: ICompliance;
  onSubmit: (data: ComplianceSchema) => void;
}

export interface ComplianceEditDialogHandle {
  open: () => void;
  close: () => void;
}

const ComplianceEditDialog = forwardRef<
  ComplianceEditDialogHandle,
  ComplianceEditDialogProps
>(({ compliance, onSubmit }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const form = useForm<ComplianceSchema>({
    resolver: zodResolver(complianceSchema),
    defaultValues: {
      ...compliance,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Compliance Details</DialogTitle>
          <DialogDescription>
            Make changes to the compliance details and click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fire"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fire Compliance</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange} // use `onCheckedChange` for boolean switch
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shops_and_establishment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shops and Establishment Compliance</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange} // use `onCheckedChange` for boolean switch
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title_clearance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title Clearance</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange} // use `onCheckedChange` for boolean switch
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sanction_plan_occupancy_certificate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sanction Plan and Occupancy Certificate
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange} // use `onCheckedChange` for boolean switch
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

ComplianceEditDialog.displayName = "ComplianceEditDialog";

export default ComplianceEditDialog;
