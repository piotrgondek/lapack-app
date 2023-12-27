import AccountModel from "@/models/accountModel";
import SessionModel from "@/models/sessionModel";
import UserModel from "@/models/userModel";
import VerificationTokenModel from "@/models/verificationTokenModel";
import { MongooseAdapter } from "@/lib/MongooseAdapter";
import connectToDB from "@/lib/connectToDB";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
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
  ], // rest of your config
  secret: process.env.SECRET,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
