import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import { ImagePlugin } from 'bootstrap-vue'
import VueCarousel from '@chenfengyuan/vue-carousel';
import store from "./store";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(ImagePlugin);

Vue.use(VueCarousel);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
