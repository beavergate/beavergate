import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Property from "@/models/Property";

// GET /api/properties
export async function GET() {
  try {
    await connectToDatabase();
    const properties = await Property.find({});
    return NextResponse.json({ success: true, data: properties });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// POST /api/properties
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const property = await Property.create(data);
    return NextResponse.json(
      { success: true, data: property },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
