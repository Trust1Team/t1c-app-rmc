const INITIAL_STATE = {
  notifications: []
}
let nextId = 1;

export default {
  namespaced: true,
  state: INITIAL_STATE,
  mutations: {
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: nextId++
      })
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== notificationToRemove.id
      )
    }
  },
  actions: {
    add({ commit }, notification) {
      commit('PUSH', notification)
    },
    remove({ commit }, notificationToRemove) {
      commit('DELETE', notificationToRemove)
    }
  }
}
