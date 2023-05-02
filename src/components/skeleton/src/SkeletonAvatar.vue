<template>
  <div class="c-skeleton-element-wrap" :class="classes">
    <skeleton-element prefix-class="c-skeleton-avatar" v-bind="$props"></skeleton-element>
  </div>
</template>

<script>
import SkeletonElement from './SkeletonElement';
import SkeletonElementProps from './SkeletonElementProps';

export default {
  name: 'CSkeletonAvatar',
  mixins: [SkeletonElementProps],
  components: { SkeletonElement },
  props: {
    shape: {
      type: String,
      default: 'circle',
      validator (value) {
        return ['circle', 'square'].indexOf(value) !== -1;
      }
    },
  },
  computed: {
    classes () {
      return {
        active: this.active
      };
    }
  }
};
</script>
