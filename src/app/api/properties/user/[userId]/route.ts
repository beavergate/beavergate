// src/app/api/properties/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Property from "@/models/Property";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectToDatabase();
    const userId = params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const properties = await Property.find({ user: userId }).exec();
    if (!properties || properties.length === 0) {
      return NextResponse.json(
        { message: "Properties not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(properties, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
