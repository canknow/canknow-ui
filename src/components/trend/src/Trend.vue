<template>
  <div class="c-trend" :class="classes">
    <span class="c-trend-content"><slot></slot></span>
    <icon :name="iconType" class="c-trend-icon"></icon>
  </div>
</template>

<script>
export default {
  name: 'CTrend',
  props: {
    type: String,
    default () {
      return 'up';
    }
  },
  computed: {
    iconType() {
      return 'arrow-' + this.type;
    },
    classes () {
      return [this.type];
    },
  }
};
</script>
