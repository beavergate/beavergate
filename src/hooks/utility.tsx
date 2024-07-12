import callApi from "@/lib/api";
import { useState } from "react";

export const useCreateUtility = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUtility = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/utilities",
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
  return [createUtility, {loading, error}] as const
};
