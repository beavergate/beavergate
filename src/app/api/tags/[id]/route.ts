import connectToDatabase from "@/lib/mongodb";
import Tag from "@/models/Tag";
import { NextResponse } from "next/server";

// GET /api/tags
export async function GET() {
  try {
    await connectToDatabase();
    const tags = await Tag.find({});
    return NextResponse.json({ success: true, data: tags });
  } catch (error: any) {
    NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// POST /api/utilities
export async function POST(req: NextResponse) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const tag = await Tag.create(data);
    return NextResponse.json({ success: true, data: tag }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
