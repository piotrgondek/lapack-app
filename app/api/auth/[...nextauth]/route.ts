import AccountModel from "@/models/account";
import SessionModel from "@/models/session";
import UserModel from "@/models/user";
import VerificationTokenModel from "@/models/verificationToken";
import { MongooseAdapter } from "@/utils/MongooseAdapter";
import connectToDB from "@/utils/connectToDB";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth({
  adapter: MongooseAdapter(connectToDB, {
    VerificationTokenModel,
    SessionModel,
    UserModel,
    AccountModel,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
