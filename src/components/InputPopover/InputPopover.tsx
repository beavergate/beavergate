import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import UploadDialog from "@/components/UploadDialog";
import { UploadDialogHandle } from "../UploadDialog/types";
import { Button } from "@/ui/button";
import { ModelDataTypes, parseFile } from "@/helpers/fileParsers";

interface InputPopoverProps {
  handleData: (data: any[]) => void;
  files: File[];
  onFilesChange: (files: File[]) => void;
  type?: ModelDataTypes;
}

const InputPopover: React.FC<InputPopoverProps> = ({
  handleData,
  files,
  onFilesChange,
  type = "property",
}) => {
  const uploadComponentRef = useRef<UploadDialogHandle>(null);

  const handleFileRemove = () => {
    onFilesChange([]);
    handleData([]);
  };

  return (
    <>
      <UploadDialog
        ref={uploadComponentRef}
        files={files}
        onFilesChange={(files) => {
          if (files.length) {
            const file = files[0];
            const handleFileLoad = (data: any[]) => {
              handleData(data);
              uploadComponentRef.current?.close();
            };

            parseFile(file, handleFileLoad, type);
          }
        }}
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
