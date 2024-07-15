import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Landlord from "@/models/Landlord";

// GET /api/landlords
export async function GET() {
  try {
    await connectToDatabase();
    const landlords = await Landlord.find({});
    return NextResponse.json(landlords, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

// POST /api/landlords
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const landlord = await Landlord.create(data);
    return NextResponse.json(landlord, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
