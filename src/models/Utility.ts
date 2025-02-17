import mongoose, { Schema, Document, Model } from "mongoose";

export type IUtility = Document & {
  electricity_board?: string;
  electricity_consumer_number?: string;
  electricity_bill_amount?: number;
  water_board?: string;
  water_consumer_number?: string;
  water_bill_amount?: number;
  type: string;
};

const utilitySchema: Schema = new mongoose.Schema(
  {
    electricity_board: {
      type: String,
    },
    electricity_consumer_number: {
      type: String,
    },
    electricity_bill_amount: {
      type: Number,
    },
    water_board: {
      type: String,
    },
    water_consumer_number: {
      type: String,
    },
    water_bill_amount: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Utility: Model<IUtility> =
  mongoose.models.Utility || mongoose.model<IUtility>("Utility", utilitySchema);

export default Utility;
