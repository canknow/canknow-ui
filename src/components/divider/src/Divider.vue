<template>
  <div class="c-divider" :class="classes"><slot></slot></div>
</template>

<script>
export default {
  name: 'CDivider',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    classes() {
      return [this.direction];
    }
  }
};
</script>
