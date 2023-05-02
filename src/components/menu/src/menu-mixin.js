export default {
  inject: ['rootMenu'],
  computed: {
    indexPath() {
      const path = [this.index];
      let parent = this.$parent;
      while (parent.$options.componentName !== 'CMenu') {
        if (parent.index) {
          path.unshift(parent.index);
        }
        parent = parent.$parent;
      }
      return path;
    },
    parentMenu() {
      let parent = this.$parent;

      while (parent && ['CMenu', 'CSubmenu'].indexOf(parent.$options.componentName) === -1) {
        parent = parent.$parent;
      }
      return parent;
    },
    paddingBase () {
      return 28;
    },
    paddingStyle() {
      if (this.rootMenu.mode !== 'vertical') {
        return {};
      }

      let padding = this.paddingBase;
      let parent = this.$parent;

      if (this.rootMenu.collapse) {
        padding = this.paddingBase;
      }
      else {
        while (parent && parent.$options.componentName !== 'CMenu') {
          if (parent.$options.componentName === 'CSubmenu') {
            padding += this.paddingBase;
          }
          parent = parent.$parent;
        }
      }
      return { paddingLeft: padding + 'px' };
    }
  }
};
