<template>
  <span class="c-color-label" :style="styles"></span>
</template>

<script>
export default {
  name: 'CColorLabel',
  props: {
    color: {
      type: [String, Number]
    }
  },
  computed: {
    styles () {
      return {
        backgroundColor: this.color
      };
    }
  }
};
</script>
