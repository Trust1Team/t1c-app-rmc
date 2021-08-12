export const Card = {
  namespaced: true,
  state: {
    biometric: null,
    address: null,
    picture: null,
    rootCertificate: null,
    intermediateCertificates: null,
    authenticationCertificate: null,
    nonRepudiationCertificate: null,
    encryptionCertificate: null,
    issuerCertificate: null,

    loadingData: true,
    loadingCertificates: true,
  },
  mutations: {
    SET_ALL_DATA(state, res) {
      state.biometric = res.data.biometric;
      state.address = res.data.address;
      state.picture = res.data.picture;
    },
    SET_ALL_CERTIFICATES(state, res) {
      state.rootCertificate = res.data.rootCertificate;
      state.intermediateCertificates = res.data.intermediateCertificates;
      state.authenticationCertificate = res.data.authenticationCertificate;
      state.nonRepudiationCertificate = res.data.nonRepudiationCertificate;
      state.encryptionCertificate = res.data.encryptionCertificate;
      state.issuerCertificate = res.data.issuerCertificate;
    },
    SET_DATA_LOADING(state, loading) {
      state.loadingData = loading;
    },
    SET_CERTIFICATE_LOADING(state, loading) {
      state.loadingCertificates = loading;
    },
  },
  actions: {
    setAllData(context, res) {
      context.commit("SET_ALL_DATA", res);
    },
    setAllCertificates(context, res) {
      context.commit("SET_ALL_CERTIFICATES", res);
    },
    setDataLoading(context, loading) {
      context.commit("SET_DATA_LOADING", loading);
    },
    setCertificateLoading(context, loading) {
      context.commit("SET_CERTIFICATE_LOADING", loading);
    },
  },
  getters: {
    getBiometric: (state) => {
      return state.biometric;
    },
    getAddress: (state) => {
      return state.address;
    },
    getPicture: (state) => {
      return state.picture;
    },
    getRootCertificate: (state) => {
      return state.rootCertificate;
    },
    getIntermediateCertificates: (state) => {
      return state.intermediateCertificates;
    },
    getAuthenticationCertificate: (state) => {
      return state.authenticationCertificate;
    },
    getNonRepudiationCertificate: (state) => {
      return state.nonRepudiationCertificate;
    },
    getEncryptionCertificate: (state) => {
      return state.encryptionCertificate;
    },
    getIssuerCertificate: (state) => {
      return state.issuerCertificate;
    },
    getDataLoading: (state) => {
      return state.loadingData;
    },
    getCertificateLoading: (state) => {
      return state.loadingCertificates;
    },
  },
};
