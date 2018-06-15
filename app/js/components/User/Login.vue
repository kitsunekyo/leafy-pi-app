<template>
  <div class="login">
    <span>You're not logged in!</span>
    <div class="button" @click="handleLoginClick">Login</div>
    <transition name="slide-fade">
      <LoginForm v-if="showForm"></LoginForm>
    </transition>
  </div>
</template>
<script>
import LoginForm from './LoginForm.vue';
export default {
  data() {
    return {
      showForm: false,
    };
  },
  components: {
    LoginForm,
  },
  methods: {
    handleLoginClick() {
      this.showForm = !this.showForm;
    },
  },
};
</script>
<style lang="scss">
.login {
  display: flex;
  align-items: center;
  span {
    margin-right: 0.5rem;
  }
}
</style>
