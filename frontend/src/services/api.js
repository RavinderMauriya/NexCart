import axios from "axios";

export const API_BASE = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// SIMPLE API REQUEST
export const apiRequest = async (
  url,
  method = "GET",
  data = null,
  token = null
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
      return error.response.data;
    }
    throw error;
  }
};


// import axios from "axios";
// export const API_BASE = "http://localhost:5000/api";

// const apiClient = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
// });

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     // Automatically catch 401s (except on login or refresh itself) to refresh
//     if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/login') && !originalRequest.url.includes('/auth/refresh')) {
//       originalRequest._retry = true;
//       try {
//         console.log("[API Interceptor] Token expired. Attempting to refresh token...");
//         const res = await axios.post(`${API_BASE}/auth/refresh`, {}, { withCredentials: true });
//         if (res.data.success) {
//           console.log("[API Interceptor] Token refreshed successfully!");
//           localStorage.setItem("token", res.data.accessToken);
//           // Update the header on original request and retry it
//           originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
//           return apiClient(originalRequest);
//         }
//       } catch (err) {
//         console.error("[API Interceptor] Refresh failed. User is completely unauthorized.", err.response?.data || err.message);
//         localStorage.removeItem("token");
//         // Dispatch an event so frontend components (like authContext) can update state
//         window.dispatchEvent(new Event('auth_unauthorized'));
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // using axios instance
// export const apiRequest = async (
//   url,
//   method = "GET",
//   data = null,
//   token = null,
// ) => {
//   const authToken = token || localStorage.getItem("token");
//   try {
//     const res = await apiClient({
//       url,
//       method,
//       headers: {
//         Authorization: authToken ? `Bearer ${authToken}` : "",
//       },
//       data,
//     });
//     console.log(`[API Request Success] ${method} ${url}:`, res.data);
//     return res.data;
//   } catch (error) {
//     if (error.response) {
//       console.log(`[API Request Responded with Error] ${method} ${url}:`, error.response.data);
//       return error.response.data;
//     }
//     console.log(`[API Request Failed] ${method} ${url}:`, error.message);
//     throw error;
//   }
// };
