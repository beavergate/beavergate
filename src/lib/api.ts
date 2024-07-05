import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from "axios";
import omit from "lodash/omit";
import { getSession } from "next-auth/react";

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure you set this environment variable
  timeout: 60000, // 60 seconds timeout
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Add a request interceptor to attach the token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.user?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      const errorStatus = error.response?.status;
      const errorMessage = error.response?.data?.message;
      if (errorStatus === 401 && errorMessage === "Unauthenticated.") {
        setTimeout(() => {
          location.href = "/auth/login";
        }, 100);
      }
    }
    return Promise.reject(error);
  }
);

const callApi = async (config: AxiosRequestConfig) => {
  try {
    const configHeaders = config?.headers || {};
    const configContentType = configHeaders['Content-Type'];
    let headers: { [key: string]: string } = {
      Accept: "application/json",
      "Content-Type": configContentType ?? "application/json",
    };

    const session = await getSession();
    const accessToken = session?.user?.accessToken;
    if (accessToken) {
      headers = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    const res = await axiosInstance.request({
      headers,
      ...omit(config, "headers"),
      ...omit(configHeaders, "Content-Type"),
    });

    const apiStatus = res.data?.status;
    return { data: res.data, status: apiStatus === false ? 0 : 1 };
  } catch (error: any) {
    if (isAxiosError(error)) {
      const errorStatus = error.response?.status || null;
      const data = error.response?.data || null;
      return {
        status: 0,
        errorStatus,
        message: error.message,
        data,
      };
    }
    return {
      status: 0,
      message: "An unknown error occurred",
    };
  }
};

export default callApi;
