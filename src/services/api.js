import axios from "axios";

const API = axios.create({
  // get from env file
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

export default API;
