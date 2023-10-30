import AccountModel from "@/models/accountModel";
import SessionModel from "@/models/sessionModel";
import UserModel from "@/models/userModel";
import VerificationTokenModel from "@/models/verificationTokenModel";
import { MongooseAdapter } from "@/lib/MongooseAdapter";
import connectToDB from "@/lib/connectToDB";
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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
