<template>
  <li class="c-menu-item-group">
    <div class="c-menu-item-group-title" :style="{paddingLeft: levelPadding + 'px'}">
      <template v-if="!$slots.title">{{title}}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'CMenuItemGroup',
  componentName: 'CMenuItemGroup',
  inject: ['rootMenu'],
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      paddingLeft: 20
    };
  },
  computed: {
    levelPadding() {
      let padding = 20;
      let parent = this.$parent;

      if (this.rootMenu.collapse) {
        return 20;
      }

      while (parent && parent.$options.componentName !== 'CMenu') {
        if (parent.$options.componentName === 'CSubmenu') {
          padding += 20;
        }
        parent = parent.$parent;
      }
      return padding;
    }
  }
};
</script>

