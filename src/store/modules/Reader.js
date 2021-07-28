export const Reader = {
  namespaced: true,
  state: { selectedReader: null },
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
};
