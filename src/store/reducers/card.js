const INITIAL_STATE = {
  // Token
  biometric: null,
  address: null,
  picture: null,
  rootCertificate: null,
  intermediateCertificates: null,
  authenticationCertificate: null,
  nonRepudiationCertificate: null,
  encryptionCertificate: null,
  issuerCertificate: null,

  // Payment
  applicationData: null,
  applications: null,
  issuerPublicCertificate: null,
  ICCPublicCertificate: null,

  loadingData: true,
  loadingCertificates: true
}

export const Card = {
  namespaced: true,
  state: INITIAL_STATE,
  mutations: {
    SET_ALL_DATA(state, res) {
      state.biometric = res.data.biometric
      state.address = res.data.address
      state.picture = res.data.picture
    },
    SET_APPLICATION_DATA(state, res) {
      state.applicationData = res.data
    },
    SET_APPLICATIONS(state, res) {
      state.applications = res.data
    },
    SET_PAYMENT_CERTIFICATES(state, res) {
      if (state.issuerPublicCertificate === null) {
        state.issuerPublicCertificate = {}
      }
      if (state.ICCPublicCertificate === null) {
        state.ICCPublicCertificate = {}
      }
      state.issuerPublicCertificate[res.aid] = res.data.issuerPublicCertificate
      state.ICCPublicCertificate[res.aid] = res.data.ICCPublicCertificate
    },
    SET_ALL_CERTIFICATES(state, res) {
      state.rootCertificate = res.data.rootCertificate
      state.intermediateCertificates = res.data.intermediateCertificates
      state.authenticationCertificate = res.data.authenticationCertificate
      state.nonRepudiationCertificate = res.data.nonRepudiationCertificate
      state.encryptionCertificate = res.data.encryptionCertificate
      state.issuerCertificate = res.data.issuerCertificate
    },
    SET_DATA_LOADING(state, loading) {
      state.loadingData = loading
    },
    SET_CERTIFICATE_LOADING(state, loading) {
      state.loadingCertificates = loading
    },
    RESET_STATE(state) {
      state.biometric = null
      state.address = null
      state.picture = null
      state.rootCertificate = null
      state.intermediateCertificates = null
      state.authenticationCertificate = null
      state.nonRepudiationCertificate = null
      state.encryptionCertificate = null
      state.issuerCertificate = null
      state.loadingData = true
      state.loadingCertificates = true

      state.applicationData = null
      state.applications = null
      state.issuerPublicCertificate = null
      state.ICCPublicCertificate = null
    }
  },
  actions: {
    setAllData(context, res) {
      context.commit('SET_ALL_DATA', res)
    },
    setApplicationData(context, res) {
      context.commit('SET_APPLICATION_DATA', res)
    },
    setApplications(context, res) {
      context.commit('SET_APPLICATIONS', res)
    },
    setPaymentCertificates(context, res) {
      context.commit('SET_PAYMENT_CERTIFICATES', res)
    },
    setAllCertificates(context, res) {
      context.commit('SET_ALL_CERTIFICATES', res)
    },
    setDataLoading(context, loading) {
      context.commit('SET_DATA_LOADING', loading)
    },
    setCertificateLoading(context, loading) {
      context.commit('SET_CERTIFICATE_LOADING', loading)
    },
    resetState(context) {
      context.commit('RESET_STATE')
    }
  },
  getters: {
    getBiometric: (state) => state.biometric,
    getAddress: (state) => state.address,
    getPicture: (state) => state.picture,
    getRootCertificate: (state) => state.rootCertificate,
    getIntermediateCertificates: (state) => state.intermediateCertificates,
    getAuthenticationCertificate: (state) => state.authenticationCertificate,
    getNonRepudiationCertificate: (state) => state.nonRepudiationCertificate,
    getEncryptionCertificate: (state) => state.encryptionCertificate,
    getIssuerCertificate: (state) => state.issuerCertificate,
    getDataLoading: (state) => state.loadingData,
    getCertificateLoading: (state) => state.loadingCertificates,
    getApplications: (state) => state.applications,
    getApplicationData: (state) => state.applicationData,
    getICCPublicCertificate: (state) => state.ICCPublicCertificate,
    getIssuerPublicCertificate: (state) => state.issuerPublicCertificate
  }
}
