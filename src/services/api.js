import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-mern-backend-gray.vercel.app/api/v1",
  withCredentials: true,
});

export default API;