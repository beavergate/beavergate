import callApi from "@/lib/api";
import { useState } from "react";

// Hook to create a landlord
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
  return [createLandlord, { loading, error }] as const;
};

// Hook to get landlord by ID
export const useGetLandlordById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLandlordById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: `/api/landlords/${id}`,
        method: "GET",
      });
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return [getLandlordById, { loading, error }] as const;
};

// Hook to get landlord by property ID
export const useGetLandlordByPropertyId = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLandlordByPropertyId = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: `/api/landlords/property/${id}`,
        method: "GET",
      });
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return [getLandlordByPropertyId, { loading, error }] as const;
};
