import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "xc-token": import.meta.env.VITE_TOKEN,
  },
});

export default api;
