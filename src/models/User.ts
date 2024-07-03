import mongoose, { Schema, Document, Model } from "mongoose";
import { IProperty } from "./Property";

export type IUser = Document & {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: string;
  provider?: string;
  properties: IProperty["_id"][];
};

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  provider: {
    type: String,
    default: "credentials"
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  }]
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
