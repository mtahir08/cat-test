import { useState } from "react";
import { API_KEY, BASE_URL } from "@env";

const useAPI = (headers = {}) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseHeaders, setResponseHeaders] = useState(null);

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
      setResponseHeaders(response.headers);
      setData(result);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const post = async (endpoint, body, resData = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setData({ ...result, ...resData });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const del = async (endpoint, body = undefined) => {
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

  return {
    get,
    del,
    post,
    data,
    isError,
    isLoading,
    headers: responseHeaders,
  };
};

export default useAPI;
