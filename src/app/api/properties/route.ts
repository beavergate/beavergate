import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Property from "@/models/Property";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/properties
export async function GET() {
  try {
    await connectToDatabase();
    const properties = await Property.find({});
    return NextResponse.json(properties);
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

// POST /api/properties
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user._id;
  try {
    await connectToDatabase();
    const data = await req.json();
    const property = await Property.create({ ...data, user });
    return NextResponse.json(property, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
