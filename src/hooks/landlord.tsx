import callApi from "@/lib/api";
import { useState } from "react";

export const useCreateLandlord = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLandlord = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/landlords",
        method: "POST",
        data,
      });
      setLoading(false);
      return res;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  return [createLandlord, {loading, error}] as const
};
