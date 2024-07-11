import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

export async function POST(request: NextRequest) {
  const { addresses } = await request.json();

  if (!Array.isArray(addresses) || addresses.length === 0) {
    return NextResponse.json(
      { error: "A non-empty array of addresses is required" },
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
    const fetchPromises = addresses.map(async (addressObj) => {
      try {
        const response = await axios.get(
          `${GEOCODE_API_URL}?address=${encodeURIComponent(addressObj.address)}&key=${apiKey}`
        );
        const data = response.data;

        if (data.status !== "OK") {
          return { ...addressObj, latitude: null, longitude: null };
        }

        const { lat, lng } = data.results[0].geometry.location;
        return { ...addressObj, latitude: lat, longitude: lng };
      } catch (error) {
        return { ...addressObj, latitude: null, longitude: null };
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
