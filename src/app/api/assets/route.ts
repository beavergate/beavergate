import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Asset from "@/models/Assets";

// GET /api/assets - Fetch all assets
export async function GET() {
  try {
    await connectToDatabase();
    const assets = await Asset.find({});
    return NextResponse.json(assets, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// POST /api/assets - Create a new asset
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const asset = await Asset.create(data);
    return NextResponse.json(asset, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
