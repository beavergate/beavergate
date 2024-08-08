import mongoose, { Schema, Document, Model } from "mongoose";
import { IProperty } from "./Property"; // Ensure the path is correct

export type ILandlord = Document & {
  name: string;
  pan?: string;
  aadhaar_card_number?: string;
  gstin?: string;
  bank_name?: string;
  bank_ifsc?: string;
  bank_account_number?: string;
  landlord_registered_address?: string;
  contact_number?: string;
  contact_email?: string;
  pan_attachment?: string;
  aadhaar_card_attachment?: string;
  cancelled_cheque_attachment?: string;
  vendor_code?: string;
};

const landlordSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
    },
    aadhaar_card_number: {
      type: String,
    },
    gstin: {
      type: String,
    },
    bank_name: {
      type: String,
    },
    bank_ifsc: {
      type: String,
    },
    bank_account_number: {
      type: String,
    },
    landlord_registered_address: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    contact_email: {
      type: String,
    },
    pan_attachment: {
      type: String,
    },
    aadhaar_card_attachment: {
      type: String,
    },
    cancelled_cheque_attachment: {
      type: String,
    },
    vendor_code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Landlord: Model<ILandlord> =
  mongoose.models.Landlord ||
  mongoose.model<ILandlord>("Landlord", landlordSchema);

export default Landlord;
