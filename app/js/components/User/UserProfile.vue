<template>
  <div class="user-profile">
    <i class="far fa-user"></i>
    <span>hi {{user.email}}</span>
    <div class="button" @click="handleLogoutClick">Logout</div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    handleLogoutClick() {
      this.$store.commit('LOGOUT_USER');
    },
  },
};
</script>
