import axios from "axios";

const API = axios.create({
  // get from env file
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export default API;