import { Model, Schema, model, models } from "mongoose";

export const technologyRef = "Technology";

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

const TechnologyModel =
  technologyRef in models
    ? (models.Technology as Model<TechnologyDocument>)
    : model<TechnologyDocument>(technologyRef, TechnologySchema);

export default TechnologyModel;
