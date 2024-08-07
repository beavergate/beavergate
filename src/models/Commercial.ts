import mongoose, { Schema, Document, Model } from "mongoose";

export type ICommercial = Document & {
  rent: number;
  security_deposit: number;
  start_date: Date;
  end_date: Date;
  lockin?: number;
  notice_period?: number;
  rent_payment_date?: Date;
  rent_payment_frequency?: string;
  escalation_clause?: string;
  deductibles?: string;
  rent_free_period?: number;
  delayed_payments_interest?: string;
  lesser_scope_of_work?: string;
  lessee_scope_of_work?: string;
  tenure?: string; // Tenure field added
};

const commercialSchema: Schema = new mongoose.Schema(
  {
    rent: {
      type: Number,
      required: true,
    },
    security_deposit: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    lockin: {
      type: Number,
    },
    notice_period: {
      type: Number,
    },
    rent_payment_date: {
      type: Date,
    },
    rent_payment_frequency: {
      type: String,
    },
    escalation_clause: {
      type: String,
    },
    deductibles: {
      type: String,
    },
    rent_free_period: {
      type: Number,
    },
    delayed_payments_interest: {
      type: String,
    },
    lesser_scope_of_work: {
      type: String,
    },
    lessee_scope_of_work: {
      type: String,
    },
    tenure: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Commercial: Model<ICommercial> =
  mongoose.models.Commercial ||
  mongoose.model<ICommercial>("Commercial", commercialSchema);

export default Commercial;
