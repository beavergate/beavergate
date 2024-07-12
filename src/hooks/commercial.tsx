import callApi from "@/lib/api";
import { useState } from "react";

export const useCreateCommericial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCommericial = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/commercials",
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
  return [createCommericial, {loading, error}] as const
};
