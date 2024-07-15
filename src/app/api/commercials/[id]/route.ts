import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Commercial from "@/models/Commercial";
import mongoose from "mongoose";

// GET /api/commercials/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const commercial = await Commercial.findById(id);
    if (!commercial) {
      return NextResponse.json({ message: "Commercial not found" }, { status: 404 });
    }
    return NextResponse.json(commercial, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

// PUT /api/commercials/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const data = await req.json();
    const commercial = await Commercial.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!commercial) {
      return NextResponse.json({ message: "Commercial not found" }, { status: 404 });
    }
    return NextResponse.json(commercial, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
