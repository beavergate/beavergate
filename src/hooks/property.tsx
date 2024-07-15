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

export const useGetPropertyById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPropertyById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: `/api/properties/${id}`,
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

  return [getPropertyById, { loading, error }] as const;
};

export const useCreateFullProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFullProperty = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/properties/create",
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

  return [createFullProperty, { loading, error }] as const;
};
