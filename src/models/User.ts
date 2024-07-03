import mongoose, { Schema, Document, Model } from "mongoose";

export type IUser = Document & {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: string;
  provider?: string;
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
  }
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
