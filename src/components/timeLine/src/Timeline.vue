<template>
  <ul :class="classes" class="c-timeline">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'CTimeline',
  props: {
    pending: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        {
          pending: this.pending
        }
      ];
    }
  }
};
</script>
