"use client";
import { useState } from "react";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiRequest = async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    setError(null);

    const isFormData = body instanceof FormData;

    const options = {
      credentials: "include",
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      body: isFormData ? body : body ? JSON.stringify(body) : null,
    };

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Something went wrong");
      }

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { apiRequest, loading, error };
}
