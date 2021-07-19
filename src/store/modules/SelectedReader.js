export const namespaced = true;

export const state = {
  selectedReader: null,
};

export const mutations = {
};

export const actions = {
  setSelectedReader(reader) {
    this.state.selectedReader = reader;
  },
};

export const getters = {
  getSelectedReader() {
    return this.state.selectedReader;
  },
};
