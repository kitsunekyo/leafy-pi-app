<template>
  <div class="app">
    <Navbar />
    <div class="site-content">
      <div class="container">
        <Dashboard v-if="user" />
      </div>
    </div>
  </div>
</template>
<script>
import Dashboard from './Dashboard.vue';
import Navbar from './Navbar.vue';

export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.loadToken();
  },
  methods: {
    loadToken() {
      const token = this.getCookie('access_token');
      if (token) this.$store.dispatch('GET_USER_FROM_TOKEN', token);
    },
    getCookie(name) {
      var match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)')
      );
      if (match) return match[2];
    },
  },
  components: {
    Navbar,
    Dashboard,
  },
};
</script>
