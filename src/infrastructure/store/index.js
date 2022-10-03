import { createStore } from 'vuex'
import main from './reducers/main'
import sideMenu from './reducers/side-menu'
import reader from './reducers/reader'
import card from './reducers/card'
import notification from './reducers/notification'

const store = createStore({
  state: {
    installed: false,
    consent: false
  },
  mutations: {
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
  modules: {
    main,
    sideMenu,
    reader,
    card,
    notification
  }
})

export function useStore() {
  return store;
}

export default store;
