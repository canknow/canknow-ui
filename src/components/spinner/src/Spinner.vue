<template>
  <div class="c-spinner">
    <div class="c-spinner-up-and-down" v-if="type==='upAndDown'">
      <span class="c-spinner-up-and-down-item c-spinner-up-and-down-item-1"></span>
      <span class="c-spinner-up-and-down-item c-spinner-up-and-down-item-2"></span>
      <span class="c-spinner-up-and-down-item c-spinner-up-and-down-item-3"></span>
      <span class="c-spinner-up-and-down-item c-spinner-up-and-down-item-4"></span>
      <span class="c-spinner-up-and-down-item c-spinner-up-and-down-item-5"></span>
    </div>

    <div class="c-spinner-circle" v-if="type==='circle'">
      <svg class="c-spinner-circle-inner" viewBox="0 0 50 50" :style="{ width: radius/2 + 'px', height: radius/2 + 'px' }">
        <circle class="path" cx="25" cy="25" r="20" fill="none" :stroke="strokeColor" :stroke-width="strokeWidth"></circle>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CSpinner',
  props: {
    type: {
      type: String,
      default: 'upAndDown'
    },
    radius: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    strokeColor: {
      type: String,
    }
  }
};
</script>
