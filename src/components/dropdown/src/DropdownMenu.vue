<template>
    <transition name="zoom-in-top" @after-leave="doDestroy">
        <ul class="c-dropdown-menu popper c-dropdown-menu-list" :class="[size && `${size}`]" v-show="showPopper">
            <slot></slot>
        </ul>
    </transition>
</template>
<script>
import Popper from '../../../utils/vue-popper';

export default {
  name: 'CDropdownMenu',
  componentName: 'CDropdownMenu',
  mixins: [Popper],
  props: {
    visibleArrow: {
      type: Boolean,
      default: false
    },
    arrowOffset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      size: this.dropdown.dropdownSize
    };
  },
  inject: ['dropdown'],
  created() {
    this.$on('updatePopper', () => {
      if (this.showPopper) this.updatePopper();
    });
    this.$on('visible', value => {
      this.showPopper = value;
    });
  },
  mounted() {
    this.dropdown.popperElement = this.popperElement = this.$el;
    this.referenceElement = this.dropdown.$el;
    // compatible with 2.6 new v-slot syntax
    // issue link https://github.com/ElemeFE/element/issues/14345
    this.dropdown.initDomOperation();
  },
  watch: {
    'dropdown.placement': {
      immediate: true,
      handler(value) {
        this.currentPlacement = value;
      }
    }
  }
};
</script>
