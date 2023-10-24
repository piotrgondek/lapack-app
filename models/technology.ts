import { Schema, model, models } from "mongoose";

export const ref = "Technology"

export type TechnologyDocument = {
  name: string;
};

const TechnologySchema = new Schema<TechnologyDocument>({
  name: {
    type: String,
    required: true,
  },
})

const Technology = models.Technology ?? model<TechnologyDocument>(ref, TechnologySchema);

export default Technology;
