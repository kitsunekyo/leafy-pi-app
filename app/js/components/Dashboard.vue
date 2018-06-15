<template>
  <div class="dashboard">
    <h1 class="title">Hello :)</h1>
    <div class="columns">
      <div class="column">
        <Pump />
      </div>
    </div>
    <!--
    <div class="columns">
      <div class="column">
        <Monitor />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <EventLog />
      </div>
    </div>-->
  </div>
</template>
<script>
import Pump from './Pump.vue';
export default {
  components: {
    Pump,
  },
};
</script>
