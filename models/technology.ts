import { Model, Schema, model, models } from "mongoose";

export const ref = "Technology";

export interface TechnologyDocument {
  name: string;
}

const x;

const TechnologySchema = new Schema<TechnologyDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Technology =
  (models.Technology as Model<TechnologyDocument> | undefined) ??
  model<TechnologyDocument>(ref, TechnologySchema);

export default Technology;
