import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import globalComponents from './global-components'
import utils from './utils'
import './libs'

import { plugin as dialogPlugin } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'

import i18n from './i18n'

// SASS Theme
import './assets/sass/app.scss'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(dialogPlugin)

globalComponents(app)
utils(app)

app.mount('#app')
