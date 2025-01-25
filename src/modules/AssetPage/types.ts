export type Asset = {
  _id: string; // Unique identifier for the asset
  name: string; // Name of the asset
  asset_tag: string; // Unique asset tag
  serial_no: string; // Serial number of the asset
  model_no: string; // Model number of the asset
  cost: number; // Cost of the asset
  issued_date: Date | null; // Date when the asset was issued
  return_date: Date | null; // Date when the asset was returned
  createdAt?: Date; // Timestamp when the asset was created
  updatedAt?: Date; // Timestamp when the asset was last updated
};
