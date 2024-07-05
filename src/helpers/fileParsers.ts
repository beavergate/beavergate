import Papa from "papaparse";
import * as XLSX from "xlsx"; 
 
type FileParserCallback = (data: any[]) => void;

const parseCSV = (file: File, callback: FileParserCallback) => {
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

const parseExcel = (file: File, callback: FileParserCallback) => {
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

export const parseFile = (file: File, callback: FileParserCallback) => {
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  if (fileExtension === "csv") {
    parseCSV(file, callback);
  } else if (fileExtension === "xlsx" || fileExtension === "xls") {
    parseExcel(file, callback);
  } else {
    console.error("Unsupported file format");
  }
};
