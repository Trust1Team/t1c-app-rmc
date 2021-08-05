import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://acc-ds.t1t.io",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getSystemInfo() {
    return apiClient.get("/v3_5/system/status", null);
  },
};
