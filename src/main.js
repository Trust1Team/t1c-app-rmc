import { createApp } from 'vue';
import Toast, { TYPE } from 'vue-toastification';
import globalComponents from './global-components';
import store from '@/infrastructure/store';
import router from './router';
import App from './App.vue';

// Import theme javascript plugins.
import '@left4code/tw-starter/dist/js/svg-loader'
import '@left4code/tw-starter/dist/js/accordion'
import '@left4code/tw-starter/dist/js/alert'
import '@left4code/tw-starter/dist/js/dropdown'
import '@left4code/tw-starter/dist/js/modal'
import '@left4code/tw-starter/dist/js/tab'

// toast CSS
import 'vue-toastification/dist/index.css';
import i18n from './i18n/i18n';

// SASS Theme
import './assets/sass/app.scss';

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
  .use(Toast, options);

globalComponents(app);

app.mount('#app');
