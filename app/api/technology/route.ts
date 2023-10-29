import Technology from "@/models/technologyModel";
import connectToDB from "@/utils/connectToDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const technologies = await Technology.find();

    return NextResponse.json({ technologies });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
