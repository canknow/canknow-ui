<template>
    <label class="c-label" :class="classes"><slot></slot></label>
</template>

<script>
import sceneMixin from '../../../mixins/sceneMixin';

export default {
  name: 'CLabel',
  mixins: [sceneMixin],
  props: {
    border: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        {
          border: !!this.border,
          fill: !!this.fill,
          [`${this.scene}`]: !!this.scene
        }
      ];
    }
  }
};
</script>
