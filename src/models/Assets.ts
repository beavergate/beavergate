import mongoose, { Schema, Document, Model } from "mongoose";

export type IAsset = Document & {
  _id: string;
  name: string;
  asset_tag: string;
  serial_no: string;
  model_no: string;
  cost: number;
  issued_date: Date | null;
  return_date: Date | null;
};

const assetSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    asset_tag: {
      type: String,
      required: true,
      unique: true,
    },
    serial_no: {
      type: String,
      required: true,
      unique: true,
    },
    model_no: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    issued_date: {
      type: Date,
      default: null,
    },
    return_date: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Asset: Model<IAsset> =
  mongoose.models.Asset || mongoose.model<IAsset>("Asset", assetSchema);

export default Asset;
