import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";
import { ILandlord } from "./Landlord";
import { ICommercial } from "./Commercial";
import { ICompliance } from "./Compliance";
import { IUtility } from "./Utility";
import { ITag } from "./Tag";

export type IProperty = Document & {
  status: string;
  photos?: string[];
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  carpet_area: number | null;
  super_built_up_area: number | null;
  pincode: string;
  state: string;
  cost_centre?: string;
  user: IUser["_id"];
  landlords: ILandlord["_id"][];
  commercial: ICommercial["_id"];
  compliance: ICompliance["_id"];
  utility: IUtility["_id"];
  tags: ITag["_id"][];
};

const propertySchema: Schema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    photos: {
      type: [String],
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null, 
    },
    carpet_area: {
      type: Number,
      required: false,
      default: null,
      get: function (value: number | null) {
        return value;
      },
    },
    super_built_up_area: {
      type: Number,
      required: false,
      default: null,
      get: function (value: number | null) {
        return value;
      },
    },
    pincode: {
      type: String,
    },
    state: {
      type: String,
    },
    cost_centre: {
      type: String,
      default: null,
    },
    landlords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Landlord",
      },
    ],
    commercial: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Commercial",
    },
    compliance: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Compliance",
    },
    utility: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Utility",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
  }, 
  {
    timestamps: true,
  }
);

propertySchema.path("carpet_area").get(function (value: number | null) {
  return value;
});

propertySchema.path("super_built_up_area").get(function (value: number | null) {
  return value;
});

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", propertySchema);

export default Property;
