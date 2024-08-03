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

        <Button
          variant={"outline"}
          className="rounded-[8px]"
          onClick={() => uploadComponentRef.current?.open()}
        >
         + Add Property
        </Button>
    </>
  );
};

export default InputPopover;
