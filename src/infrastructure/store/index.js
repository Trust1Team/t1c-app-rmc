import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import main from './reducers/main';
import config from './reducers/config';
import sideMenu from './reducers/side-menu';
import reader from './reducers/reader';
import card from './reducers/card';
import notification from './reducers/notification';

// Add the module names that needs to be persisted to the pats array.
const persistedState = createPersistedState({
  key: 'store',
  paths: ['main'],
});

const store = createStore({
  modules: {
    main,
    config,
    sideMenu,
    reader,
    card,
    notification
  },
  plugins: [persistedState],
})

export function useStore() {
  return store;
}

export default store;
