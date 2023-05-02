<template>
  <li class="c-menu-item"
    role="menuitem"
    tabindex="-1"
    :class="{
      'active': active,
      'disabled': disabled
    }"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave">
    <div class="c-menu-item-title-box" :style="[paddingStyle]">
      <tooltip v-if="parentMenu.$options.componentName === 'CMenu' && rootMenu.collapse && $slots.title" effect="dark" placement="right">
        <div slot="content"><slot name="title"></slot></div>
        <div style="position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 20px;">
          <slot></slot>
        </div>
      </tooltip>
      <template v-else>
        <slot></slot>
        <slot name="title"></slot>
      </template>
    </div>
  </li>
</template>
<script>
import Menu from './menu-mixin';
import Tooltip from './../../tooltip';
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  name: 'CMenuItem',
  componentName: 'CMenuItem',
  mixins: [Menu, Emitter],
  components: { Tooltip },
  props: {
    index: {
      default: null,
      validator: value => typeof value === 'string' || value === null
    },
    route: [String, Object],
    disabled: Boolean
  },
  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex;
    },
    mode() {
      return this.rootMenu.mode;
    }
  },
  methods: {
    onMouseEnter() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) {
        return;
      }
      this.$el.style.backgroundColor = this.hoverBackground;
    },
    onMouseLeave() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) {
        return;
      }
      this.$el.style.backgroundColor = this.backgroundColor;
    },
    handleClick() {
      if (!this.disabled) {
        this.dispatch('CMenu', 'item-click', this);
        this.$emit('click', this);
      }
    }
  },
  mounted() {
    this.parentMenu.addItem(this);
    this.rootMenu.addItem(this);
  },
  beforeDestroy() {
    this.parentMenu.removeItem(this);
    this.rootMenu.removeItem(this);
  }
};
</script>
