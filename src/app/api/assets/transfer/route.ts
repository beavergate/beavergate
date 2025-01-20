import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import UserAssetMap from "@/models/UserAssetMap";
import User from "@/models/User";

// POST /api/assets/transfer - Transfer an asset
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const { transferedEmail, assetId } = data;

    const prevAsset = await UserAssetMap.findOne({
      id: assetId,
    });
    if (!prevAsset) {
      return NextResponse.json(
        { message: "Asset not found", success: false },
        { status: 404 }
      );
    }
    prevAsset.status = "transfered";
    prevAsset.save();

    const user = await User.findOne({ email: transferedEmail });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const transferedUserData = {
      asset_id: assetId,
      email: transferedEmail,
      uid: user._id,
      status: "assigned",
    };

    const asset = await UserAssetMap.create(transferedUserData);
    return NextResponse.json(asset, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
