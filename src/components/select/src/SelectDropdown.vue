<template>
  <div class="c-select-dropdown c-popper"
       :class="[{ 'multiple': $parent.multiple }, popperClass]"
       :style="{ minWidth: minWidth }">
    <slot></slot>
  </div>
</template>

<script>
import Popper from '../../../../src/utils/vue-popper';

export default {
  name: 'CSelectDropdown',
  componentName: 'CSelectDropdown',
  mixins: [Popper],
  props: {
    placement: {
      default: 'bottom-start'
    },
    boundariesPadding: {
      default: 0
    },
    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    visibleArrow: {
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      minWidth: ''
    };
  },
  computed: {
    popperClass() {
      return this.$parent.popperClass;
    }
  },
  watch: {
    '$parent.inputWidth'() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },
  mounted() {
    this.referenceElement = this.$parent.$refs.reference.$el;
    this.$parent.popperElement = this.popperElement = this.$el;
    this.$on('updatePopper', () => {
      if (this.$parent.visible) {
        this.updatePopper();
      }
    });
    this.$on('destroyPopper', this.destroyPopper);
  }
};
</script>
