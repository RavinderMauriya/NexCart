export const API_BASE = "http://localhost:5000/api";

export const apiRequest = async (url, method = "GET", data = null) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(API_BASE + url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });
  return res.json();
};
