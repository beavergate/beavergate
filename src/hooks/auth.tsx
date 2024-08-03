import callApi from "@/lib/api";
import { useState } from "react";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/auth/register", // Adjust the API endpoint as necessary
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

  return [register, { loading, error }] as const;
};
