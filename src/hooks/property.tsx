import { useGlobalState } from "@/context/GlobalStateContext";
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
export const useGetPropertiesByUserId = () => {
  const {
    actions: { setProperties },
  } = useGlobalState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPropertiesByUserId = async ({
    page = 1,
    limit = 10,
    q = "", // Use 'q' for search
  }: {
    page?: number;
    limit?: number;
    q?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: `/api/properties/user?page=${page}&limit=${limit}&q=${encodeURIComponent(
          q
        )}`,
        method: "GET",
      });
      setLoading(false);
      setProperties(res.data.properties);
      return res.data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return [getPropertiesByUserId, { loading, error }] as const;
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
      console.log("res", res);
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

export const useGetPropertiesForMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPropertiesForMap = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: `/api/properties/map`,
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

  return [getPropertiesForMap, { loading, error }] as const;
};
