import "./../scss/index.scss";

import Vue from 'vue';

import App from './components/App.vue';
import store from './store/store';

const app = new Vue({
  el: '#app',
  store,
  components: {
    App,
  }
});