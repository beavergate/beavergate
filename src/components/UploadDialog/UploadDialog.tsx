import BaseDragger from "@/components/BaseDragger";
import { Dialog, DialogContent, DialogOverlay } from "@/ui/dialog";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { UploadDialogHandle, UploadDialogProps } from "./types";



const UploadDialog = forwardRef<UploadDialogHandle, UploadDialogProps>(
  ({files, setFiles}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    
    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay />

        <DialogContent className="max-h-[600px] max-w-[800px] h-full w-full">
          <h1>Import your files here</h1>
          <div className="flex  justify-center">
            <BaseDragger
              className="w-[500px] h-[180px]"
              files={files}
              setFiles={setFiles}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

UploadDialog.displayName = "UploadDialog";

export default UploadDialog;
