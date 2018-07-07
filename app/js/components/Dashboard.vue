<template>
  <div class="dashboard">
    <div class="columns">
      <div class="column is-one-third">
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
