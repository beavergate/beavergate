import React, { ReactNode } from "react";
import {
  useDropzone,
  DropzoneOptions,
  DropzoneState,
  FileRejection,
  DropEvent,
} from "react-dropzone";
import { cn } from "@/utils/cn";
import { toast } from "@/ui/use-toast";

type BaseDraggerProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  className?: string;
  dropZoneProps?: DropzoneOptions;
  children?: ReactNode;
};

const BaseDragger: React.FC<BaseDraggerProps> = ({
  files,
  onFilesChange,
  className,
  dropZoneProps = {
    multiple: false,
    maxFiles: 1,
  },
  children,
}) => {
  const onDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    if (fileRejections.length > 0) {
      toast({
        closeicn: "destructive",
        description:
          "Some files were rejected due to size limit or unsupported format.",
      });
    }
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    onFilesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive }: DropzoneState =
    useDropzone({
      onDrop,
      accept: {
        "text/csv": [".csv"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "application/vnd.ms-excel": [".xls"],
      },
      ...dropZoneProps,
    });

  return (
    <div
      {...getRootProps()}
      className={cn(
        `rounded-md py-4 text-center flex items-center justify-center text-[16px] border-[1px] border-dashed border-secondary-400 hover:border-primary-500 bg-transparent ${
          isDragActive ? "border-blue-500" : ""
        }`,
        className
      )}
    >
      <input {...getInputProps()} />
      {children || (
        <p>Drag & drop a CSV file here, or click to select a file</p>
      )}
    </div>
  );
};

export default BaseDragger;
