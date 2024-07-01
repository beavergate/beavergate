// src/app/api/geocode/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const GEOCODE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const addresses = searchParams.getAll('address');

  if (addresses.length === 0) {
    return NextResponse.json({ error: 'At least one address parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PALCES_API_KEY; // Corrected API key name
  if (!apiKey) {
    return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
  }

  try {
    const fetchPromises = addresses.map((address) =>
      axios.get(GEOCODE_API_URL, {
        params: {
          address: encodeURIComponent(address),
          key: apiKey,
        },
      }).then(response => response.data)
    );

    const results = await Promise.all(fetchPromises);
    const geocodedData = results.map((data, index) => {
      if (data.status !== 'OK') {
        return { address: addresses[index], error: data.error_message || 'Failed to geocode address' };
      }
      const { lat, lng } = data.results[0].geometry.location;
      return { address: addresses[index], lat, lng };
    });

    return NextResponse.json(geocodedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
