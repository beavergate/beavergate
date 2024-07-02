import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let addresses = searchParams.getAll("address");

  if (addresses.length === 0) {
    return NextResponse.json(
      { error: "At least one valid address parameter is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Maps API key not configured" },
      { status: 500 }
    );
  }

  try {
    const fetchPromises = addresses.map(async (address) => {
      try {
        const response = await axios.get(`${GEOCODE_API_URL}?address=${encodeURIComponent(address)}&key=${apiKey}`);
        const data = response.data;

        if (data.status !== "OK") {
          return {
            address,
            error: data.error_message || "Failed to geocode address",
          };
        }

        const { lat, lng } = data.results[0].geometry.location;
        return { address, lat, lng };

      } catch (error) {
        return {
          address,
          error: "Error fetching geocode data",
        };
      }
    });

    const geocodedData = await Promise.all(fetchPromises);

    return NextResponse.json(geocodedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
