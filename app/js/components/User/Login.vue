<template>
  <div class="login">
    <div class="button" @click="handleLoginClick">Login</div>
    <LoginForm v-if="showForm"></LoginForm>
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

