import { Model, Schema, model, models } from "mongoose";

export const groupRef = "Group";

export interface GroupDocument {
  name: string;
}

const GroupSchema = new Schema<GroupDocument>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const GroupModel =
  groupRef in models
    ? (models.Group as Model<GroupDocument>)
    : model<GroupDocument>(groupRef, GroupSchema);

export default GroupModel;
