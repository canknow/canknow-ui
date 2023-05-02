<template>
  <div class="c-skeleton-element-wrap" :class="classes">
    <skeleton-element prefix-class="skeleton-input" v-bind="$props"></skeleton-element>
  </div>
</template>

<script>
import SkeletonElementProps from './SkeletonElementProps';
import SkeletonElement from './SkeletonElement';

export default {
  name: 'CSkeletonInput',
  mixins: [SkeletonElementProps],
  components: { SkeletonElement },
  computed: {
    classes () {
      return {
        active: this.active
      };
    }
  }
};
</script>
