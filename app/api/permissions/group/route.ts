import { auth, config } from "@/lib/auth";
import connectToDB from "@/lib/connectToDB";
import GroupModel from "@/models/permissions/groupModel";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("chuj");
    const x = await getServerSession(/* req, res, */ config);

    console.log({ x });

    await connectToDB();

    const groups = await GroupModel.find();

    return NextResponse.json({ groups });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error }, { status: 500 });
  }
};
