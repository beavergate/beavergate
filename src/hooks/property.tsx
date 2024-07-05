import callApi from "@/lib/api";
import { useState } from "react";

export const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProperty = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/properties",
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

  return [createProperty, { loading, error }] as const;
};
