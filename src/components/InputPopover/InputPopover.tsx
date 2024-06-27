import UploadDialog from "@/components/UploadDialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { UploadDialogHandle } from "../UploadDialog/types";

const InputPopover: React.FC = () => {

    const [files, setFiles ] =useState<File[]>([])
  const uploadComponentRef = useRef<UploadDialogHandle>(null);

  return (
    <>
      <UploadDialog 
        ref={uploadComponentRef} 
        files = {files}
        setFiles = {setFiles}
      />
      
      <div className="max-w-sm p-4 bg-white shadow-md rounded-md h-[300px] w-[300px]">
        <div className="flex items-center mb-4">
          <span className="mr-auto text-gray-700">Import</span>
        </div>
        <div className="flex items-center justify-center h-[100%] w-full">
          <Button 
            variant={"outline"} 
            className="rounded-[8px]" 
            onClick={() => uploadComponentRef.current?.open()}
          >
            Upload Your CSV
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputPopover;
