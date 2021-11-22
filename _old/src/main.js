import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Dialog
import { plugin as dialogPlugin } from "gitart-vue-dialog";
import "gitart-vue-dialog/dist/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import i18n from "./i18n";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);
app.use(dialogPlugin);

app.mount("#app");
