import connectToDatabase from "@/lib/mongodb";
import Tag from "@/models/Tag";
import { NextRequest, NextResponse } from "next/server";

// GET /api/tags
export async function GET() {
  try {
    await connectToDatabase();
    const tags = await Tag.find({});
    return NextResponse.json(tags, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

// POST /api/tags
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const tag = await Tag.create(data);
    return NextResponse.json(tag, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
