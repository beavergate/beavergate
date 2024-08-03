// src/app/api/commercials/property/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Commercial from "@/models/Commercial";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const propertyId = params.id;
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return NextResponse.json({ message: "Invalid ID", success: false }, { status: 400 });
    }
    const commercial = await Commercial.findOne({ property: propertyId }).exec();
    if (!commercial) {
      return NextResponse.json(
        { message: "Commercial property not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { commercial, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false }, { status: 400 });
  }
}
