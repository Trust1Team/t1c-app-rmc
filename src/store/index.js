import { createStore } from "vuex";
import { Reader } from "./modules/Reader";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    reader: Reader,
  },
});
