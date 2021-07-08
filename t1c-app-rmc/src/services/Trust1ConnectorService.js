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
    // TODO make the variables configurable via docker
    // Return a initialised T1C client
    if (client != null) return client;
    else {
      return T1CClient.initialize(
        new T1CConfig(
          new T1CConfigOptions(
            "https://t1c.t1t.io",
            51883,
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
