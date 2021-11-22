import { T1CClient, T1CConfig, T1CConfigOptions } from "t1c-sdk-js";

let client = null;

let errorClient = null;

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default {
  init() {
    // Return a initialised T1C client
    if (client != null)
      return new Promise((resolve) => {
        resolve(client);
      });
    else {
      return T1CClient.initialize(
        new T1CConfig(
          new T1CConfigOptions(
            window.VUE_APP_ENV_T1C_URL
              ? window.VUE_APP_ENV_T1C_URL
              : "https://t1c.t1t.io",
            window.VUE_APP_ENV_T1C_PORT ? window.VUE_APP_ENV_T1C_PORT : 51783,
            null,
            null,
            null,
            location.hostname
          )
        )
      );
    }
  },
  getClient() {
    return client;
  },
  setClient(c) {
    client = c;
  },
  getErrorClient() {
    return errorClient;
  },
  setErrorClient(c) {
    errorClient = c;
  },
  getRand(length) {
    return makeid(length);
  },
};
