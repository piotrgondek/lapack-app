import { Model, Schema, model, models } from "mongoose";

export const ref = "Technology"

export type TechnologyDocument = {
  name: string;
};

const TechnologySchema = new Schema<TechnologyDocument>({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  })

const Technology: Model<TechnologyDocument> = models.Technology ?? model<TechnologyDocument>(ref, TechnologySchema);

export default Technology;
