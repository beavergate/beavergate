import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import UserAssetMap from "@/models/UserAssetMap";

// POST /api/assets/assign - assign an asset to user

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const asset = await UserAssetMap.create(data);
    return NextResponse.json(asset, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
