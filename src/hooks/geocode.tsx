import { useState } from "react";
import callApi from "@/lib/api";

export const useGeocodeAddresses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocodeAddresses = async (addresses: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/geocode",
        method: "POST",
        data: { addresses },
      });
      setLoading(false);
      return res;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return [geocodeAddresses, { loading, error }] as const;
};
