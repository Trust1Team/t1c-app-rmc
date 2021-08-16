import axios from "axios";

function apiClient(jwt) {
  if (jwt) {
    return axios.create({
      baseURL: "https://acc-ds.t1t.io",
      withCredentials: false,
      headers: {
        Authorization: "Bearer " + jwt,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: "https://acc-ds.t1t.io",
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}

export default {
  getSystemInfo() {
    return apiClient(null).get("/v3_5/system/status", null);
  },

  getLatestVersion() {
    return new Promise((resolve, reject) => {
      this.getJWT().then((jwt) => {
        apiClient(jwt.data)
          .get("/v3_5/versions/latest")
          .then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
      });
    });
  },
  getJWT() {
    return apiClient(null).get("/v3_5/tokens/application", {
      headers: {
        apikey: window.VUE_APP_ENV_API_KEY,
      },
    });
  },
};
