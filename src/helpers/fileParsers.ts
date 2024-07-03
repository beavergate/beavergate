import Papa from "papaparse";
import * as XLSX from "xlsx";

export const parseCSV = (file: File, callback: (data: any[]) => void) => {
  Papa.parse(file, {
    header: true,
    complete: (result) => {
      callback(result.data);
    },
    error: (error) => {
      console.error("Error parsing CSV:", error);
    },
  });
};

export const parseExcel = (file: File, callback: (data: any[]) => void) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target?.result as ArrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    callback(json);
  };
  reader.readAsArrayBuffer(file);
};
