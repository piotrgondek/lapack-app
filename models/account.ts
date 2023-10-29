import { Model, Schema, model, models } from "mongoose";
import { AdapterAccount } from "next-auth/adapters";

export const accountRef = "Account";

const AccountSchema = new Schema<AdapterAccount>({
  provider: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  access_token: String,
  id_token: String,
  refresh_token: String,
  expires_at: Number,
  scope: String,
  token_type: String,
  session_state: String,
  userId: {
    type: String,
    required: true,
  },
});

const AccountModel =
  (models.Account as Model<AdapterAccount> | undefined) ??
  model<AdapterAccount>(accountRef, AccountSchema);

export default AccountModel;
