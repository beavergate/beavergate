import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Landlord from "@/models/Landlord";

// GET /api/landlords
export async function GET() {
  try {
    await connectToDatabase();
    const landlords = await Landlord.find({});
    return NextResponse.json({ success: true, data: landlords });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// POST /api/landlords
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const landlord = await Landlord.create(data);
    return NextResponse.json(
      { success: true, data: landlord },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
