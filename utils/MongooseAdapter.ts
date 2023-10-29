import { Model } from "mongoose";
import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";

interface MongooseAdapterOptions {
  AccountModel: Model<AdapterAccount>;
  SessionModel: Model<AdapterSession>;
  UserModel: Model<AdapterUser>;
  VerificationTokenModel: Model<VerificationToken>; // TODO: sprawdzić nazwę, czy to jest mnoga czy nie
}

export function MongooseAdapter(
  connectToDB: () => Promise<unknown>,
  {
    AccountModel,
    SessionModel,
    UserModel,
    VerificationTokenModel,
  }: MongooseAdapterOptions,
): Adapter {
  return {
    createUser: async (user) => {
      await connectToDB();
      return await UserModel.create(user);
    },
    getUser: async (id) => {
      await connectToDB();
      return await UserModel.findById(id);
    },
    getUserByEmail: async (email) => {
      await connectToDB();
      return await UserModel.findOne({ email });
    },
    getUserByAccount: async ({ provider, providerAccountId }) => {
      await connectToDB();
      const account = await AccountModel.findOne({
        provider,
        providerAccountId,
      });

      if (account == null) return null;

      return await UserModel.findById(account.userId);
    },
    updateUser: async (updatedUser) => {
      await connectToDB();
      return (
        (await UserModel.findByIdAndUpdate(updatedUser.id, updatedUser)) ??
        (await new UserModel(updatedUser).save())
      );
    },
    deleteUser: async (userId) => {
      await connectToDB();
      await Promise.all([
        AccountModel.deleteMany({ userId }),
        SessionModel.deleteMany({ userId }),
        UserModel.findByIdAndDelete(userId),
      ]);
    },
    linkAccount: async (account) => {
      await connectToDB();
      return await AccountModel.create(account);
    },
    unlinkAccount: async ({ provider, providerAccountId }) => {
      await connectToDB();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return (await AccountModel.findOneAndDelete({
        provider,
        providerAccountId,
      }))!;
    },
    getSessionAndUser: async (sessionToken) => {
      await connectToDB();
      const session = await SessionModel.findOne({ sessionToken });

      if (session == null) return null;

      const user = await UserModel.findById(session.userId);

      if (user == null) return null;

      return { session, user };
    },
    createSession: async (session) => {
      await connectToDB();
      return await SessionModel.create(session);
    },
    updateSession: async (session) => {
      await connectToDB();
      return SessionModel.findOneAndUpdate(
        { sessionToken: session.sessionToken },
        session,
      );
    },
    deleteSession: async (sessionToken) => {
      await connectToDB();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return (await SessionModel.findOneAndDelete({ sessionToken }))!;
    },
    createVerificationToken: async (verificationToken) => {
      await connectToDB();
      return await VerificationTokenModel.create(verificationToken);
    },
    useVerificationToken: async ({ identifier, token }) => {
      await connectToDB();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return (await VerificationTokenModel.findOneAndDelete({
        identifier,
        token,
      }))!;
    },
  };
}
