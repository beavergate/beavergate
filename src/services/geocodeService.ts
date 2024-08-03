// services/geocodeService.ts
import axios from "axios";

const GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY;

if (!apiKey) {
  throw new Error("Google Maps API key not configured");
}

export const geocodeAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `${GEOCODE_API_URL}?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = response.data;

    if (data.status !== "OK") {
      return { latitude: null, longitude: null };
    }

    const { lat, lng } = data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    return { latitude: null, longitude: null };
  }
};

export const geocodeAddresses = async (addresses: { address: string }[]) => {
  const fetchPromises = addresses.map(async (addressObj) => {
    const geocodedData = await geocodeAddress(addressObj.address);
    return { ...addressObj, ...geocodedData };
  });

  return Promise.all(fetchPromises);
};
