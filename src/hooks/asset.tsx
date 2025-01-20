import callApi from "@/lib/api";
import { useState } from "react";

// Hook to create an asset
export const useCreateAsset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAsset = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/assets",
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

  return [createAsset, { loading, error }] as const;
};

// Hook to fetch all assets
export const useGetAllAssets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/assets",
        method: "GET",
      });
      setLoading(false);
      return res.data; // Return the list of assets
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err; // Rethrow error to allow handling in the component
    }
  };

  return [getAllAssets, { loading, error }] as const;
};

// Hook to assign an asset to a user
export const useAssignAsset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignAsset = async (data: {
    asset_id: string;
    email: string;
    uid: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/assets/assign",
        method: "POST",
        data,
      });
      setLoading(false);
      return res.data; // Return the assigned asset data
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err; // Rethrow error to allow handling in the component
    }
  };

  return [assignAsset, { loading, error }] as const;
};

// Hook to transfer an asset to another user
export const useTransferAsset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transferAsset = async (data: {
    transferedEmail: string;
    assetId: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callApi({
        url: "/api/assets/transfer",
        method: "POST",
        data,
      });
      setLoading(false);
      return res.data; // Return the transferred asset data
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err; // Rethrow error to allow handling in the component
    }
  };

  return [transferAsset, { loading, error }] as const;
};
