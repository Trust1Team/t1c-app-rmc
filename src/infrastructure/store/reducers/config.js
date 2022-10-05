const INITIAL_STATE = {
  installed: false,
  consent: false
}

export default {
  namespaced: true,
  state: INITIAL_STATE,
  mutations: {
    SET_DARK_MODE(state, { darkMode }) {
      state.darkMode = darkMode
    },
    SET_INSTALLED(state, installed) {
      state.installed = installed
    },
    SET_CONSENT(state, consent) {
      state.consent = consent
    }
  },
  actions: {
    setInstalled(context, installed) {
      context.commit('SET_INSTALLED', installed);
    },
    setConsent(context, consent) {
      context.commit('SET_CONSENT', consent);
    }
  },
  getters: {
    getInstalled: state => state.installed,
    getConsent: state => state.consent
  },
}
