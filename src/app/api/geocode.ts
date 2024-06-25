import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface Geocode {
  lat: number;
  lng: number;
}

const getGeocode = async (
  address: string,
  apiKey: string
): Promise<Geocode | null> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;
  try {
    const response = await axios.get(url, {
      params: {
        address: address,
        key: apiKey,
      },
    });
    const { data } = response;
    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error(data.status);
    }
  } catch (error: any) {
    console.error(
      `Error fetching geocode for address ${address}: ${error.message}`
    );
    return null;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  if (!address || typeof address !== "string") {
    return res
      .status(400)
      .json({ error: "Address is required and should be a string" });
  }

  const apiKey: string = process.env.GOOGLE_API_KEY as string;

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Google API key is not set in environment variables" });
  }

  const geocode = await getGeocode(address, apiKey);
  if (geocode) {
    return res.status(200).json(geocode);
  } else {
    return res.status(500).json({ error: "Failed to fetch geocode" });
  }
};

export default handler;
