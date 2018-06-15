<template>
  <div class="form-info" :class="type">
    <i :class="icon" v-if="icon"></i>
    <span>{{message}}</span>
  </div>
</template>
<script>
export default {
  props: ['type', 'message', 'icon'],
};
</script>
