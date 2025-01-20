import mongoose, { Schema, Document, Model } from "mongoose";
import { IAsset } from "./Assets";

export type IUserAssetMap = Document & {
  _id: string;
  uid: string;
  email: string;
  asset_id: IAsset["_id"];
  status: string;
};

const userAssetMapSchema: Schema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    asset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["assigned", "pending", "transfered"],
    },
  },
  {
    timestamps: true,
  }
);

const UserAssetMap: Model<IUserAssetMap> =
  mongoose.models.UserAssetMap ||
  mongoose.model<IUserAssetMap>("UserAssetMap", userAssetMapSchema);

export default UserAssetMap;
