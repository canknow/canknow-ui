<template>
  <h3 class="c-skeleton-title" :class="classes" :style="style" v-bind="$props"></h3>
</template>

<script>
import SkeletonElementProps from './SkeletonElementProps';

export default {
  name: 'CSkeletonTitle',
  mixins: [SkeletonElementProps],
  props: {
    width: {
      type: [Number, String]
    },
  },
  computed: {
    style() {
      return {
        width: this.width
      };
    },
    classes () {
      return {
        active: this.active
      };
    }
  }
};
</script>
