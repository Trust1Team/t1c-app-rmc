export const Reader = {
  namespaced: true,
  state: {
    selectedReader: null,
  },
  mutations: {
    SET_SELECTED_READER(state, reader) {
      state.selectedReader = reader;
    },
  },
  actions: {
    setSelectedReader(context, reader) {
      context.commit("SET_SELECTED_READER", reader);
    },
  },
  getters: {
    getSelectedReader: (state) => {
      return state.selectedReader;
    },
  },
};
