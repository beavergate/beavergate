import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import UploadDialog from "@/components/UploadDialog";
import { UploadDialogHandle } from "../UploadDialog/types";
import { Button } from "@/ui/button";
import { parseFile } from "@/helpers/fileParsers";

interface InputPopoverProps {
  handleJsonData: (data: any[]) => void;
  files: File[],
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const InputPopover: React.FC<InputPopoverProps> = ({ handleJsonData, files, setFiles }) => {
  const uploadComponentRef = useRef<UploadDialogHandle>(null);

  useEffect(() => {
    if (files.length) {
      const file = files[0];

      const handleFileLoad = (data: any[]) => {
        handleJsonData(data);
        console.log("data", data);
        uploadComponentRef.current?.close();
      };

      parseFile(file, handleFileLoad);
    }
  }, [files]);
  const handleFileRemove = () => {
    setFiles([]);
    handleJsonData([]);
  };

  return (
    <>
      <UploadDialog
        ref={uploadComponentRef}
        files={files}
        setFiles={setFiles}
      />
      <div className="max-w-sm p-4 bg-white shadow-md rounded-md h-[300px] w-[300px]">
        <div className="flex items-center mb-4">
          <span className="mr-auto text-gray-700">Import</span>
        </div>
        {files.length ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-2 text-gray-700">{files[0]?.name}</p>
            <Button
              variant="outline"
              onClick={handleFileRemove}
              className="mb-2"
            >
              Remove File
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[100%] w-full">
            <Button
              variant={"outline"}
              className="rounded-[8px]"
              onClick={() => uploadComponentRef.current?.open()}
            >
              Upload Your CSV
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default InputPopover;
