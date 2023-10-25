import Technology from "@/models/technology";
import connectToDB from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name } = (await req.json()) as { name: string };

    await connectToDB();

    const technology = new Technology({ name });

    const data = await technology.save();

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
