import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import store from './store';
import "./filters"
import helpers from "./helpers"
import moment from 'moment';

Vue.config.productionTip = false;

// Used plugin instead of global mixins...
const plugin = {
  install() {
    Vue.helpers = helpers;
    Vue.prototype.$helpers = helpers
  }
}

Vue.use(moment);
Vue.use(plugin);

new Vue({
  store,
  render: h => h(App),
  router
}).$mount("#app");
