import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast, { TYPE } from 'vue-toastification'
import globalComponents from './global-components'
import utils from './utils'
import './libs'

// toast CSS
import 'vue-toastification/dist/index.css'

import i18n from './i18n'

// SASS Theme
import './assets/sass/app.scss'

// Toast default options
const options = {
  toastDefaults: {
    // ToastOptions object for each type of toast
    [TYPE.ERROR]: {
      timeout: 10000,
      closeButton: false,
      position: 'top-right'
    },
    [TYPE.SUCCESS]: {
      timeout: 3000,
      hideProgressBar: false,
      position: 'top-right'
    }
  }
}

const app = createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(Toast, options)

globalComponents(app)
utils(app)

app.mount('#app')
