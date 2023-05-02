<template>
  <button class="c-container-close-button" :class="{'vertical-center': verticalCenter}" @click="onClick">
      <icon aria-label="Close"
            name="cross"
            class="c-container-close-button-icon"></icon>
  </button>
</template>

<script>
export default {
  name: 'CContainerCloseButton',
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
