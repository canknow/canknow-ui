<template>
  <a
      class="c-link"
      :class="classes"
      :href="disabled ? null : href"
      v-bind="$attrs"
      @click="handleClick">

    <Icon class="c-link-icon" :name="icon" v-if="icon"></Icon>

    <span v-if="$slots.default" class="c-link-inner">
      <slot></slot>
    </span>

    <template v-if="$slots.icon"><slot v-if="$slots.icon" name="icon"></slot></template>
  </a>
</template>

<script>

export default {
  name: 'CLink',
  props: {
    scene: {
      type: String,
      default: 'default'
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    href: String,
    icon: String
  },
  computed: {
    classes () {
      return [
        this.scene,
        {
          disabled: this.disabled,
          underline: this.underline && !this.disabled
        }
      ];
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        if (!this.href) {
          this.$emit('click', event);
        }
      }
    }
  }
};
</script>
