import "./../scss/index.scss";

import Vue from 'vue';
import Toasted from 'vue-toasted';

import App from './components/App.vue';
import store from './store/store';

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 3000,
});

const app = new Vue({
  el: '#app',
  store,
  components: {
    App,
  }
});