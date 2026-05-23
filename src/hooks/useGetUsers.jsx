import { useEffect, useState, useRef } from "react";
import { API_MAX_ATTEMPTS, INTERVAL_BETWEEN_ATTEMPTS } from "../constants";
export default function useGetUsers() {
  const token = import.meta.env.VITE_API_TOKEN;
  const [responseApi, setResponse] = useState("loading...");
  const attemptsRemaining = useRef(API_MAX_ATTEMPTS);

  const getResponse = async () => {
    if (attemptsRemaining.current <= 0) {
      return;
    }
    attemptsRemaining.current--;
    const response = await fetch(
      `https://api.onsign.tv/dev-challenge/?access_token=${token}`,
    );
    if (response.status === 200) {
      setResponse(await response.json());
      return;
    }
    setTimeout(() => {
      getResponse();
    }, INTERVAL_BETWEEN_ATTEMPTS);
  };

  useEffect(() => {
    getResponse();
  }, []);

  return { responseApi };
}
