<template>
  <icon aria-label="Close" name="remove-circle" class="c-clear-button" :class="{'vertical-center': verticalCenter}" @click.native="onClick"></icon>
</template>

<script>
export default {
  name: 'CClearButton',
  props: {
    verticalCenter: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick () {
      this.$emit('click');
    }
  }
};
</script>
