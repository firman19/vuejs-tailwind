import Vue from 'vue'
import axios from "axios";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

// createApp(App).use(router).use(VueSweetalert2).mount("#app");

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');