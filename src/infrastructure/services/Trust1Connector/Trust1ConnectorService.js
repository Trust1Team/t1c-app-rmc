import { T1CClient, T1CConfig, T1CConfigOptions } from 't1c-sdk-js';

let client = null;
let errorClient = null;

const makeId = length => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export default {
  // url and port variables are used when we want to force reinitalise otherwise we just return the already existing client
  init(url, port) {
    // Return a initialised T1C client
    if (!url && !port && client) {
      return new Promise((resolve) => {
        resolve(client);
      })
    } else {
      const config = new T1CConfig(
        new T1CConfigOptions(
          url || (window._env_.VUE_APP_T1C_URL ? window._env_.VUE_APP_T1C_URL : 'https://t1c.t1t.io'),
          port || (window._env_.VUE_APP_T1C_PORT ? window._env_.VUE_APP_T1C_PORT : 51783),
          url || (window._env_.VUE_APP_T1C_URL ? window._env_.VUE_APP_T1C_URL : 'https://t1c.t1t.io'),
          port || (window._env_.VUE_APP_T1C_PORT ? window._env_.VUE_APP_T1C_PORT : 51783),
          null,
          location.hostname
        )
      );

      return T1CClient.initialize(config);
    }
  },
  getClient() {
    return client;
  },
  getClientBeid(readerId) {
    return client.beid(readerId)
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
    return makeId(length);
  }
}
