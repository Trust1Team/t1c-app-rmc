import axios from 'axios';

const apiClient = () => {
  const baseInstance = {
    baseURL: window?.VUE_APP_ENV_BFF_URL || 'http://localhost:9000',
    withCredentials: false,
  }

  return axios.create(baseInstance);
}

export default {
  validateChain(certs) {
    const updatedChainData = [];

    for (let i = 0; i < certs.length; i++) {
      updatedChainData.push(
        {
          order: i,
          certificate: certs[i]
        }
      )
    }

    const data = {
      certificateChain: updatedChainData
    }

    return apiClient().post('/v1/validate', data)
  },
  getStatus() {
    return apiClient().get('/v1/validate/status')
  }
}
