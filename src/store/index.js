import { createStore } from "vuex";
import { Reader } from "./modules/Reader";
import { Card } from "./modules/Card";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    reader: Reader,
    card: Card,
  },
});
