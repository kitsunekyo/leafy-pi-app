<template>
  <div class="login-form">
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Email" v-model="email" />
        <span class="icon is-small is-left">
          <i class="fas fa-user" />
        </span>
      </div>
    </div>
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="password" placeholder="Password" v-model="password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock" />
        </span>
      </div>
    </div>
    <div class="field">
      <button class="button" @click="handleSubmit">Login</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('ATTEMPT_LOGIN', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

