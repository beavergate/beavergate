import UploadDialog from "@/components/UploadDialog";
import React, { useEffect, useRef, useState } from "react";
import { UploadDialogHandle } from "../UploadDialog/types";
import { Button } from "@/ui/button";
import Papa from "papaparse";
import * as XLSX from "xlsx";

interface InputPopoverProps {
  handleJsonData: (data: any[]) => void;
}

const InputPopover: React.FC<InputPopoverProps> = ({ handleJsonData }) => {
  const [files, setFiles] = useState<File[]>([]);
  const uploadComponentRef = useRef<UploadDialogHandle>(null);

  if (files.length) {
    uploadComponentRef.current?.close();
  }
  useEffect(() => {
    if (files.length) {
      const file = files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileExtension === "csv") {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            handleJsonData(result.data);
            uploadComponentRef.current?.close();
          },
          error: (error: Error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          handleJsonData(json);
          uploadComponentRef.current?.close();
        };
        reader.readAsArrayBuffer(file);
      } else {
        console.error("Unsupported file format");
      }
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
