import callApi from "@/lib/api";
import { useState } from "react";

export const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const states = { loading, error };

  const createGroup = async (data: any) => {
    setLoading(true);
    setError(null);
    const res = await callApi({
      url: "/api/properties",
      method: "POST",
      data,
    });
    setLoading(false);
    return res;
  };

  return [createGroup, states];
};
