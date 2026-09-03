import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message;
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);
