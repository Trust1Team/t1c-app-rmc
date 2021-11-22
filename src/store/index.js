import { createStore } from 'vuex'
import main from './main'
import sideMenu from './side-menu'
import { Reader } from './modules/Reader'
import { Card } from './modules/Card'
import { Notification } from './modules/Notification'

const store = createStore({
  modules: {
    main,
    sideMenu,
    reader: Reader,
    card: Card,
    notification: Notification
  }
})

export function useStore() {
  return store
}

export default store
