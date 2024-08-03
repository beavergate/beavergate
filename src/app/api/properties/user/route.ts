// src/app/api/properties/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Property from "@/models/Property";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user._id as string;
  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const query = url.searchParams.get("q") || ""; // Get query parameter 'q'

    // Define the search query with `$or` using a type assertion
    const searchQuery: any = { user: userId };

    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { tags: { $elemMatch: { $regex: query, $options: "i" } } },
      ];
    }

    const properties = await Property.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await Property.countDocuments(searchQuery);

    return NextResponse.json(
      {
        properties,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
