<template>
  <div class="pump card">
    <header class="card-header">
      <p class="card-header-title">Pump</p>
    </header>
    <div class="card-image">
      <figure class="image is-cut">
        <img src="https://images.unsplash.com/photo-1446608943998-cbd52b140335?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=abd17fa40a49b2c4c98084fbaf0fa34f&auto=format&fit=crop&w=1267&q=80" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content" v-if="isWatering">
      <div class="content">
        <h3>watering in progress...</h3>
        <progress class="progress is-primary" :value="this.progress" max="100"></progress>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click.prevent="handleWaterClick">
        Water
      </a>
    </footer>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      isWatering: false,
      progress: 0,
    };
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    },
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + this.auth.token;
  },
  methods: {
    handleWaterClick() {
      if (!this.isWatering) {
        this.sendWater();
      }
    },
    sendWater() {
      console.log(`${CONFIG.api.host}/api/pump/water`, {
        headers: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      });
      this.isWatering = true;
      axios.post(`${CONFIG.api.host}/api/pump/water`).then(res => {
        this.runProgress().then(() => {
          this.isWatering = false;
        });
      });
    },
    runProgress() {
      return new Promise((resolve, reject) => {
        let __progress = this.progress;
        const interval = setInterval(() => {
          if (this.progress >= 100) {
            clearInterval(interval);
            this.progress = 0;
            resolve();
          } else {
            __progress++;
            this.progress = __progress;
          }
        }, 50);
      });
    },
  },
};
</script>
<style lang="scss">
.pump {
  min-width: 300px;
  .content {
    text-align: center;
  }
  .card-image {
    height: 300px;
    overflow: hidden;
  }
}
</style>
