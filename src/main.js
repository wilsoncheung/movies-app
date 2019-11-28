import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import store from './store';
import "./filters"
import moment from 'moment';

Vue.config.productionTip = false;

Vue.use(moment);

new Vue({
  store,
  render: h => h(App),
  router
}).$mount("#app");
