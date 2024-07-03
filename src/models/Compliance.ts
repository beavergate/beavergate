import mongoose, { Schema, Document, Model } from "mongoose";
import { IProperty } from "./Property"; // Ensure the path is correct

export type ICompliance = Document & {
  fire?: boolean;
  shops_and_establishment?: boolean;
  title_clearance?: boolean;
  sanction_plan_occupancy_certificate?: boolean;
  property: IProperty["_id"]; 
};

const complianceSchema: Schema = new mongoose.Schema(
  {
    fire: {
      type: Boolean,
      default: false,
    },
    shops_and_establishment: {
      type: Boolean,
      default: false,
    },
    title_clearance: {
      type: Boolean,
      default: false,
    },
    sanction_plan_occupancy_certificate: {
      type: Boolean,
      default: false,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  {
    timestamps: true,
  }
);

const Compliance: Model<ICompliance> =
  mongoose.models.Compliance || mongoose.model<ICompliance>("Compliance", complianceSchema);

export default Compliance;
