export type UploadDialogProps = {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  };
  
  export type UploadDialogHandle = {
    open: () => void;
    close: () => void;
  };