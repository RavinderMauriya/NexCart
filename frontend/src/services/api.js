import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// SIMPLE API REQUEST
export const apiRequest = async (
  url,
  method = "GET",
  data = null,
  token = null,
) => {
  try {
    const res = await apiClient({
      url,
      method,
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      console.log(
        `[API Request Responded with Error] ${method} ${url}:`,
        error.response.data,
      ); //for console
      return error.response.data;
    }
    console.log(`[API Request Failed] ${method} ${url}:`, error.message); //for console
    throw error;
  }
};
