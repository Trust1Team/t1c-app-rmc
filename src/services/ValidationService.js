import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://validation.t1t.be",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getStatus() {
    return apiClient.get("/api/status", null);
  },
};
