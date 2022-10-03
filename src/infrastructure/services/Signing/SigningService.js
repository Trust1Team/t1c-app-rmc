import axios from 'axios';

const apiClient = () => {
  const baseInstance = {
    baseURL: window?.VUE_APP_ENV_BFF_URL || 'http://localhost:9000',
    withCredentials: false,
  }

  return axios.create(baseInstance);
}

export default {
  uploadFile(file, nonRepCert, rootCert, intermediateCert) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('non-repudiation-certificate', nonRepCert)
    formData.append('root-certificate', rootCert)
    formData.append('intermediate-certificate', intermediateCert)

    return apiClient().post('/v1/sign/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  sign(docId, nonRepCert, rootCert, intermediateCert, signedData) {
    const data = {
      docId: docId,
      nonRepudiationCertificate: nonRepCert,
      intermediateCertificate: intermediateCert,
      rootCertificate: rootCert,
      signedData: signedData
    }
    return apiClient().post('/v1/sign', data)
  }
}
