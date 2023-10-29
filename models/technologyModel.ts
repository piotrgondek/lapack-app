import { Model, Schema, model, models } from "mongoose";

export const ref = "Technology";

export interface TechnologyDocument {
  name: string;
}

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
  "Technology" in models
    ? (models.Technology satisfies Model<TechnologyDocument>)
    : model<TechnologyDocument>(ref, TechnologySchema);

export default Technology;
