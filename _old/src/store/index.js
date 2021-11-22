import { createStore } from "vuex";
import { Reader } from "./modules/Reader";
import { Card } from "./modules/Card";
import { Notification } from "./modules/Notification";

export default createStore({
  state: {
    installed: false,
    consent: false,
  },
  mutations: {
    SET_INSTALLED(state, installed) {
      state.installed = installed;
    },
    SET_CONSENT(state, consent) {
      state.consent = consent;
    },
  },
  actions: {
    setInstalled(context, installed) {
      context.commit("SET_INSTALLED", installed);
    },
    setConsent(context, consent) {
      context.commit("SET_CONSENT", consent);
    },
  },
  getters: {
    getInstalled: (state) => {
      return state.installed;
    },
    getConsent: (state) => {
      return state.consent;
    },
  },
  modules: {
    reader: Reader,
    card: Card,
    notification: Notification,
  },
});
