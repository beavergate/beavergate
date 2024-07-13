import { ICommercial } from "@/models/Commercial";
import { ICompliance } from "@/models/Compliance";
import { ILandlord } from "@/models/Landlord";
import { IProperty } from "@/models/Property";
import { IUtility } from "@/models/Utility";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export type ModelDataTypes =
  | "property"
  | "landlord"
  | "compliance"
  | "commercial"
  | "utility"
  | "all";

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

export const parseFile = (
  file: File,
  callback: FileParserCallback,
  type: ModelDataTypes = "all"
) => {
  const middleCallback = (data: any[]) => {
    const structuredData = dataMiddleware(data, type);
    callback(structuredData);
  };

  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  if (fileExtension === "csv") {
    parseCSV(file, middleCallback);
  } else if (fileExtension === "xlsx" || fileExtension === "xls") {
    parseExcel(file, middleCallback);
  } else {
    console.error("Unsupported file format");
  }
};

const mapToProperty = (item: any): Partial<IProperty> => {
  return {
    status: item.status || "",
    photos: item.photos ? [] : [],
    name: item.name || "",
    address: item.address || "",
    latitude: parseFloat(item.latitude) || null,
    longitude: parseFloat(item.longitude) || null,
    carpet_area: parseFloat(item.carpet_area) || null,
    super_built_up_area: parseFloat(item.super_built_up_area) || null,
    pincode: item.pincode || "",
    state: item.state || "",
    cost_centre: item.cost_centre || "",
    // user: item.user || "",
    tags: item.tags ? [item.tags] : [],
  };
};

const mapToLandlord = (item: any): Partial<ILandlord> => {
  return {
    name: item.landlord_name || "",
    pan: item.landlord_pan || "",
    aadhaar_card_number: item.landlord_aadhaar_card_number || "",
    gstin: item.landlord_gstin || "",
    bank_name: item.landlord_bank_name || "",
    bank_ifsc: item.landlord_bank_ifsc || "",
    bank_account_number: item.landlord_bank_account_number || "",
    landlord_registered_address:
      item.landlord_landlord_registered_address || "",
    contact_number: item.landlord_contact_number || "",
    contact_email: item.landlord_contact_email || "",
    pan_attachment: item.landlord_pan_attachment || "",
    aadhaar_card_attachment: item.landlord_aadhaar_card_attachment || "",
    cancelled_cheque_attachment:
      item.landlord_cancelled_cheque_attachment || "",
    vendor_code: item.landlord_vendor_code || "",
  };
};

const mapToCompliance = (item: any): Partial<ICompliance> => {
  return {
    fire: item.fire || false,
    shops_and_establishment: item.shops_and_establishment || false,
    title_clearance: item.title_clearance || false,
    sanction_plan_occupancy_certificate:
      item.sanction_plan_occupancy_certificate || false,
  };
};

const mapToCommercial = (item: any): Partial<ICommercial> => {
  return {
    rent: parseFloat(item.rent) || 0,
    security_deposit: parseFloat(item.security_deposit) || 0,
    start_date: new Date(item.start_date),
    end_date: new Date(item.end_date),
    lockin: parseFloat(item.lockin) || undefined,
    notice_period: parseFloat(item.notice_period) || undefined,
    rent_payment_date: item.rent_payment_date
      ? new Date(item.rent_payment_date)
      : undefined,
    rent_payment_frequency: item.rent_payment_frequency || "",
    escalation_clause: item.escalation_clause || "",
    deductibles: item.deductibles || "",
    rent_free_period: parseFloat(item.rent_free_period) || undefined,
    delayed_payments_interest: item.delayed_payments_interest || "",
    lesser_scope_of_work: item.lesser_scope_of_work || "",
    lessee_scope_of_work: item.lessee_scope_of_work || "",
    tenure: item.tenure || "",
  };
};

const mapToUtility = (item: any): Partial<IUtility> => {
  return {
    electricity_board: item.electricity_board || "",
    electricity_consumer_number: item.electricity_consumer_number || "",
    electricity_bill_amount: parseFloat(item.electricity_bill_amount) || 0,
    water_board: item.water_board || "",
    water_consumer_number: item.water_consumer_number || "",
    water_bill_amount: parseFloat(item.water_bill_amount) || 0,
    type: item.type || "",
  };
};

export const dataMiddleware = (data: any[], type: ModelDataTypes) => {
  switch (type) {
    case "property":
      return data.map((item) => mapToProperty(item));
    case "landlord":
      return data.map((item) => mapToLandlord(item));
    case "compliance":
      return data.map((item) => mapToCompliance(item));
    case "commercial":
      return data.map((item) => mapToCommercial(item));
    case "utility":
      return data.map((item) => mapToUtility(item));
    case "all":
      return [{
        landlords: data.map((item) => mapToLandlord(item)),
        compliance: data.map((item) => mapToCompliance(item))[0],
        commercial: data.map((item) => mapToCommercial(item))[0],
        utility: data.map((item) => mapToUtility(item))[0],
        property: data.map((item) => mapToProperty(item))[0],
      }];
    default:
      return data;
  }
};
