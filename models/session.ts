import { Schema, models, Model, model } from "mongoose";
import { AdapterSession } from "next-auth/adapters";

export const sessionRef = "Session";

const SessionSchema = new Schema<AdapterSession>({
  sessionToken: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const SessionModel =
  (models.Session as Model<AdapterSession> | undefined) ??
  model<AdapterSession>(sessionRef, SessionSchema);

export default SessionModel;
