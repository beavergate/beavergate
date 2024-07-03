import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User"; // Make sure the path is correct

type IProperty = Document & {
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
};

const propertySchema: Schema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending", "Sold"], // Example statuses
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
