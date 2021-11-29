import axios from 'axios'

function apiClient() {
  return axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: false
  })
}

export default {
  validateChain(authCert, rootCert, intermediateCert) {
    const data = {
      certificateChain: [
        {
          order: 0,
          certificate: authCert
        },
        {
          order: 1,
          certificate: intermediateCert
        },
        {
          order: 2,
          certificate: rootCert
        }
      ]
    }
    return apiClient().post('/v1/validate', data)
  }
}
