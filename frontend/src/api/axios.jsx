import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Backend URL
  withCredentials: true, // important for cookies
});

export default instance;
