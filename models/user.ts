import { Model, Schema, model, models } from "mongoose";
import { AdapterUser } from "next-auth/adapters";

export const userRef = "User";

const UserSchema = new Schema<AdapterUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    required: true,
  },
});

const UserModel =
  (models.User as Model<AdapterUser> | undefined) ??
  model<AdapterUser>(userRef, UserSchema);

export default UserModel;
