export type UploadDialogProps = {
    files: File[]
    onFilesChange: (files: File[]) => void;
  };
  
  export type UploadDialogHandle = {
    open: () => void;
    close: () => void;
  };