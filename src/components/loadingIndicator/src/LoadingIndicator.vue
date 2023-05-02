<template>
<span class="c-loading-indicator" :class="classes">
  <i></i>
  <i></i>
  <i></i>
</span>
</template>

<script>
export default {
  name: 'CLoadingIndicator',
  props: {
    scene: {
      type: String,
      default: 'default'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return {
        [this.scene]: !!this.scene,
        block: this.block
      };
    }
  }
};
</script>
