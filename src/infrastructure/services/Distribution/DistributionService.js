import axios from 'axios';

const apiClient = jwt => {
  const baseInstance = {
    baseURL: window?.VUE_APP_DS_URL || 'https://acc-ds.t1t.io',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (jwt) {
   baseInstance.headers.Authorization = `Bearer ${jwt}`;
  }

  return axios.create(baseInstance);
}

export default {
  getSystemInfo() {
    return apiClient().get('/v3_5/system/status', null)
  },

  getLatestVersion() {
    return new Promise((resolve, reject) => {
      this.getJWT().then((jwt) => {
        apiClient(jwt.data.data)
          .get('/v3_5/versions/latest')
          .then(
            (res) => {
              resolve(res)
            },
            (err) => {
              reject(err)
            }
          )
      })
    })
  },
  getJWT() {
    return apiClient().get('/v3_5/tokens/application', {
      headers: {
        apikey: window?.VUE_APP_API_KEY || '799f2350-7aee-4dd6-8f6f-ab82be18b21a'
      }
    })
  }
}
