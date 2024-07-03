import mongoose, { Schema, Document, Model } from "mongoose";

export type ITag = Document & {
  name: string;
};

const tagSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tag: Model<ITag> =
  mongoose.models.Tag || mongoose.model<ITag>("Tag", tagSchema);

export default Tag;
