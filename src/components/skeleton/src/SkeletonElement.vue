<template>
  <span :class="classes" :style="style"></span>
</template>

<script>
import SkeletonElementProps from './SkeletonElementProps';

export default {
  mixins: [SkeletonElementProps],
  props: {
    prefixClass: {
      type: String
    }
  },
  computed: {
    classes() {
      return [
        this.prefixClass,
        this.size,
        this.shape,
      ];
    },
    sizeStyle () {
      return typeof this.size === 'number' ? {
        width: this.size,
        height: this.size,
        lineHeight: `${this.size}px`,
      } : {};
    },
    style () {
      return {
        ...this.sizeStyle
      };
    }
  }
};
</script>