import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueResource from "vue-resource";
import Vant from 'vant';
import 'vant/lib/index.css';
import '_lib-flexible@0.3.2@lib-flexible/flexible.js';
import './assets/basic.scss';
Vue.use(VueResource);
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");