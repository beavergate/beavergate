import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Commercial from "@/models/Commercial";

// GET /api/commercials
export async function GET() {
  try {
    await connectToDatabase();
    const commercials = await Commercial.find({});
    return NextResponse.json(commercials);
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

// POST /api/commercials
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const commercial = await Commercial.create(data);
    return NextResponse.json(commercial, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
