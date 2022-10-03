const INITIAL_STATE = {
  selectedReader: null,
  selectedPin: null,
  selectedPinType: null
}

export default {
  namespaced: true,
  state: INITIAL_STATE,
  mutations: {
    SET_SELECTED_READER(state, reader) {
      state.selectedReader = reader
    },
    SET_SELECTED_PIN(state, pin) {
      state.selectedPin = pin
    },
    SET_SELECTED_PIN_TYPE(state, type) {
      state.selectedPinType = type
    }
  },
  actions: {
    setSelectedReader(context, reader) {
      context.commit('SET_SELECTED_READER', reader)
    },
    setSelectedPin(context, pin) {
      context.commit('SET_SELECTED_PIN', pin)
    },
    setSelectedPinType(context, pinType) {
      context.commit('SET_SELECTED_PIN_TYPE', pinType)
    }
  },
  getters: {
    getSelectedReader: (state) => state.selectedReader,
    getSelectedPin: (state) => state.selectedPin,
    getSelectedPinType: (state) => state.selectedPinType,
  }
}

