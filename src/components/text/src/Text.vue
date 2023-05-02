<template>
  <span class="c-text" :class="classes">
    <slot></slot>
  </span>
</template>

<script>
import sceneMixin from '../../../mixins/sceneMixin';

export default {
  name: 'CText',
  mixins: [sceneMixin],
  computed: {
    classes () {
      return [`text-${this.scene}`];
    }
  }
};
</script>
