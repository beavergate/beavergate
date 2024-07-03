import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User"; // Make sure the path is correct
import { ILandlord } from "./Landlord"; // Make sure the path is correct
import { ICommercial } from "./Commercial"; // Make sure the path is correct
import { ICompliance } from "./Compliance"; // Make sure the path is correct
import { IUtility } from "./Utility"; // Make sure the path is correct
import { ITag } from "./Tag"; // Make sure the path is correct

export type IProperty = Document & {
  status: string;
  photos?: string[];
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  carpet_area: number;
  super_built_up_area: number;
  pincode: string;
  state: string;
  cost_centre?: string;
  user: IUser["_id"];
  landlords: ILandlord["_id"][];
  commercial: ICommercial["_id"];
  compliance: ICompliance["_id"];
  utilities: IUtility["_id"][];
  tags: ITag["_id"][];
};

const propertySchema: Schema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Active", "Inactive"], // Example statuses
      default: "Active",
    },
    photos: {
      type: [String],
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    carpet_area: {
      type: Number,
      required: true,
      get: function (value: number) {
        return value;
      },
    },
    super_built_up_area: {
      type: Number,
      required: true,
      get: function (value: number) {
        return value;
      },
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    cost_centre: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    landlords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Landlord",
        required: true,
      }
    ],
    commercial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commercial",
      required: true,
    },
    compliance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Compliance",
      required: true,
    },
    utilities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utility",
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      }
    ],
  },
  {
    timestamps: true,
  }
);

propertySchema.path("carpet_area").get(function (value: number) {
  return value;
});

propertySchema.path("super_built_up_area").get(function (value: number) {
  return value;
});

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", propertySchema);

export default Property;
