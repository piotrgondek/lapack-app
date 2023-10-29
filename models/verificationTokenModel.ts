import { Model, Schema, model, models } from "mongoose";
import { VerificationToken } from "next-auth/adapters";

export const verificationTokenRef = "VerificationToken";

const VerificationTokenSchema = new Schema<VerificationToken>({
  identifier: { type: String, required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});

const VerificationTokenModel =
  "VerificationToken" in models
    ? (models.VerificationToken satisfies Model<VerificationToken>)
    : model<VerificationToken>(verificationTokenRef, VerificationTokenSchema);

export default VerificationTokenModel;
