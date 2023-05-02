<template>
  <ul class="c-detailed-list" :class="classes"><slot></slot></ul>
</template>

<script>
export default {
  name: 'CDetailedList',
  props: {
    labelWidth: {
      type: [Number, String],
    },
    justify: {
      type: String
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  computed: {
    classes () {
      return [
        this.size,
        {
          [`justify-${this.justify}`]: !!this.justify
        }
      ];
    }
  }
};
</script>
