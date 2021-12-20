import { createApp } from "vue";
import "./tailwind.css";
import "mosha-vue-toastify/dist/style.css";
import App from "./App.vue";
import store from "./store";
import router from "./router";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
