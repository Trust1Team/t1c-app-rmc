import axios from "axios";

function apiClient(jwt) {
  if (jwt) {
    return axios.create({
      baseURL: "https://accapim.t1t.be",
      withCredentials: false,
      headers: {
        Authorization: "Bearer " + jwt,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: "https://accapim.t1t.be",
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}

export default {
  //TODO Need to add the actual OCV api --> t1gateway
  // https://accapim.t1t.be/trust1team/ocv-api/v2/system/status
  getStatus() {
    return new Promise((resolve, reject) => {
      this.getJWT().then((jwt) => {
        apiClient(jwt.data.token)
          .get("/trust1team/ocv-api/v2/system/status")
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
    return apiClient(null).get("/apiengineauth/v1/login/application/token", {
      headers: {
        apikey: "7de3b216-ade2-4391-b2e2-86b80bac4d7d",
      },
    });
  },
};
