<template>
  <div class="user">
    <Login v-if="!user"></Login>
    <UserProfile v-else></UserProfile>
  </div>
</template>
<script>
import Login from './Login.vue';
import UserProfile from './UserProfile.vue';
export default {
  components: {
    Login,
    UserProfile,
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {},
};
</script>
