import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import i18n from "./i18n";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);

app.mount("#app");
