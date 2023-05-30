import axios from "axios";

const instance = axios.create({
  baseURL:'https://mern-blog-new.onrender.com' && 'http://localhost:4444',
  // baseURL:process.env.REACT_APP_API_URL,
  // baseURL:'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
