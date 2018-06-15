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
<style lang="scss">
.user-profile {
  display: flex;
  align-items: center;
  i,
  span {
    margin-right: 0.5rem;
  }
}
</style>

