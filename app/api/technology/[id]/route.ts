import TechnologyModel from "@/models/technologyModel";
import connectToDB from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params;

    await connectToDB();

    const technology = await TechnologyModel.findById(id);

    return NextResponse.json({ data: technology });
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
