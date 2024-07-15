import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Utility from "@/models/Utility";

// GET /api/utilities
export async function GET() {
  try {
    await connectToDatabase();
    const utilities = await Utility.find({});
    return NextResponse.json(utilities, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

// POST /api/utilities
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const utility = await Utility.create(data);
    return NextResponse.json(utility, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
