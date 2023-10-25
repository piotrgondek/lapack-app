import Technology from "@/models/technology";
import connectToDB from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    await connectToDB();

    const technology = await Technology.findById(id);

    return NextResponse.json({ data: technology });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
