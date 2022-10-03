const INITIAL_STATE = {
  darkMode: false
}

export default {
  namespaced: true,
  state: INITIAL_STATE,
  mutations: {
    SET_DARK_MODE(state, { darkMode }) {
      state.darkMode = darkMode
    }
  },
  actions: {
    setDarkMode({ commit }, darkMode) {
      commit('SET_DARK_MODE', { darkMode })
    }
  },
  getters: {
    darkMode: state => state.darkMode
  },
}
