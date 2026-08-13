import axios from "axios";

// Every API call in this app goes through this single axios instance.
// Change VITE_API_BASE_URL in your .env file to point at the backend
// once it's running — nothing else in the app needs to change.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 8000,
});

export default client;
