import { useState } from "react";
import { API_KEY, BASE_URL } from "@env";

const useAPI = (headers = {}) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...headers,
    },
  };

  const get = async (endpoint) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const post = async (endpoint, body) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const deleteRecord = async (endpoint, body = undefined) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...requestOptions,
        method: "DELETE",
        body: body ?? JSON.stringify(body),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return { get, post, data, isLoading, isError, delete: deleteRecord };
};

export default useAPI;
