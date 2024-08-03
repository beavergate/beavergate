// app/api/geocode/route.ts
import { NextRequest, NextResponse } from "next/server";
import { geocodeAddresses } from "@/services/geocodeService";

export async function POST(request: NextRequest) {
  const { addresses } = await request.json();

  if (!Array.isArray(addresses) || addresses.length === 0) {
    return NextResponse.json(
      { error: "A non-empty array of addresses is required" },
      { status: 400 }
    );
  }

  try {
    const geocodedData = await geocodeAddresses(addresses);
    return NextResponse.json(geocodedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
