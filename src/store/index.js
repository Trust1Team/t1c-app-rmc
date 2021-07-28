import { createStore } from "vuex";

export default createStore({
  state: {
    selectedReader: null,
  },
  mutations: {},
  actions: {
    setSelectedReader(reader) {
      this.state.selectedReader = reader;
    },
  },
  getters: {
    getSelectedReader: (state) => {
      return state.selectedReader;
    },
  },
  modules: {
    // Reader,
  },
});
