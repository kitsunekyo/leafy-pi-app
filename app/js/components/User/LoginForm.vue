<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" v-model="email" required />
        <span class="icon is-small is-left">
          <i class="fas fa-user" />
        </span>
      </div>
    </div>
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="password" placeholder="Password" v-model="password" required />
        <span class="icon is-small is-left">
          <i class="fas fa-lock" />
        </span>
      </div>
    </div>
    <div class="field">
      <button type="submit" class="button">Submit</button>
    </div>
  </form>
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
      this.$store
        .dispatch('ATTEMPT_LOGIN', {
          email: this.email,
          password: this.password,
        })
        .then(res => {
          this.$toasted.show(`Hi, ${res.data.user.email}`, {
            type: 'success',
            action: {
              text: 'dismiss',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        })
        .catch(err => {
          this.$toasted.show('Invalid Credentials', {
            type: 'error',
            action: {
              text: 'dismiss',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        });
    },
  },
};
</script>

<style lang="scss">
.login-form {
  position: absolute;
  background: #ffffff;
  border-bottom: 5px solid #a9c93b;
  padding: 25px 15px;
  width: 250px;
  top: 0;
  right: 0;
  margin-top: 35px;
  text-align: left;
  .button {
    width: 100%;
  }
}
</style>
