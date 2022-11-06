import { useState } from "react";
import { useCallback } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestDone, setRequestDone] = useState(false);

  const fetchData = useCallback(async (fetchConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    setRequestDone(false);

    try {
      const response = await fetch(fetchConfig.url, {
        method: fetchConfig.method ?? "GET",
        headers: fetchConfig.headers ?? {},
        body: JSON.stringify(fetchConfig.body) ?? null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "something went wrong!");
    }
    setIsLoading(false);
    setRequestDone(true);
  }, []);

  return {
    isLoading,
    error,
    fetchData,
    requestDone,
  };
};

export default useFetch;
