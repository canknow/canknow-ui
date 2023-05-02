<script type="text/jsx">
import CollapseTransition from '../../collapseTransition/src/CollapseTransition';
import menuMixin from './menu-mixin';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import Popper from './../../../utils/vue-popper';

const poperMixins = {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: false
    },
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions
  },
  data: Popper.data,
  methods: Popper.methods,
  beforeDestroy: Popper.beforeDestroy,
  deactivated: Popper.deactivated
};

export default {
  name: 'CSubmenu',
  componentName: 'CSubmenu',
  mixins: [menuMixin, Emitter, poperMixins],
  components: { CollapseTransition },
  props: {
    index: {
      type: String,
      required: true
    },
    showTimeout: {
      type: Number,
      default: 100
    },
    hideTimeout: {
      type: Number,
      default: 100
    },
    popperClass: String,
    disabled: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      popperJS: null,
      timeout: null,
      items: {},
      submenus: {},
      mouseInChild: false
    };
  },
  watch: {
    opened(value) {
      if (this.isMenuPopup) {
        this.$nextTick(_ => {
          this.updatePopper();
        });
      }
    }
  },
  computed: {
    // popper option
    appendToBody() {
      return this.popperAppendToBody === undefined
        ? this.isFirstLevel
        : this.popperAppendToBody;
    },
    menuTransitionName() {
      return this.rootMenu.collapse ? 'zoom-in-left' : 'zoom-in-top';
    },
    opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1;
    },
    active() {
      let isActive = false;
      const submenus = this.submenus;
      const items = this.items;

      Object.keys(items).forEach(index => {
        if (items[index].active) {
          isActive = true;
        }
      });

      Object.keys(submenus).forEach(index => {
        if (submenus[index].active) {
          isActive = true;
        }
      });

      return isActive;
    },
    mode() {
      return this.rootMenu.mode;
    },
    isMenuPopup() {
      return this.rootMenu.isMenuPopup;
    },
    isFirstLevel() {
      let isFirstLevel = true;
      let parent = this.$parent;
      while (parent && parent !== this.rootMenu) {
        if (['CSubmenu', 'CMenuItemGroup'].indexOf(parent.$options.componentName) > -1) {
          isFirstLevel = false;
          break;
        }
        else {
          parent = parent.$parent;
        }
      }
      return isFirstLevel;
    }
  },
  methods: {
    handleCollapseToggle(value) {
      if (value) {
        this.initPopper();
      }
      else {
        this.doDestroy();
      }
    },
    addItem(item) {
      this.$set(this.items, item.index, item);
    },
    removeItem(item) {
      delete this.items[item.index];
    },
    addSubmenu(item) {
      this.$set(this.submenus, item.index, item);
    },
    removeSubmenu(item) {
      delete this.submenus[item.index];
    },
    handleClick() {
      const { rootMenu, disabled } = this;
      if ((rootMenu.menuTrigger === 'hover' && rootMenu.mode === 'horizontal') ||
          (rootMenu.collapse && rootMenu.mode === 'vertical') ||
          disabled) {
        return;
      }
      this.dispatch('CMenu', 'submenu-click', this);
    },
    handleMouseenter(event, showTimeout = this.showTimeout) {
      if (!('ActiveXObject' in window) && event.type === 'focus' && !event.relatedTarget) {
        return;
      }
      const { rootMenu, disabled } = this;

      if ((rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
          (!rootMenu.collapse && rootMenu.mode === 'vertical') ||
          disabled) {
        return;
      }
      this.dispatch('CSubmenu', 'mouse-enter-child');
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.rootMenu.openMenu(this.index, this.indexPath);
      }, showTimeout);
    },
    handleMouseleave() {
      const { rootMenu } = this;
      if (
        (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
                    (!rootMenu.collapse && rootMenu.mode === 'vertical')
      ) {
        return;
      }
      this.dispatch('CSubmenu', 'mouse-leave-child');
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.appendToBody) {
          this.rootMenu.openedMenus = [];
        }
        !this.mouseInChild && this.rootMenu.closeMenu(this.index);
      }, this.hideTimeout);
    },
    handleTitleMouseenter() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
      const title = this.$refs['submenu-title'];
      title && (title.style.backgroundColor = this.rootMenu.hoverBackground);
    },
    handleTitleMouseleave() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
      const title = this.$refs['submenu-title'];
      title && (title.style.backgroundColor = this.rootMenu.backgroundColor || '');
    },
    updatePlacement() {
      this.currentPlacement = this.mode === 'horizontal' && this.isFirstLevel
        ? 'bottom-start'
        : 'right-start';
    },
    initPopper() {
      this.referenceElement = this.$el;
      this.popperElement = this.$refs.menu;
      this.updatePlacement();
    }
  },
  created() {
    this.$on('toggle-collapse', this.handleCollapseToggle);
    this.$on('mouse-enter-child', () => {
      this.mouseInChild = true;
      clearTimeout(this.timeout);
    });
    this.$on('mouse-leave-child', () => {
      this.mouseInChild = false;
      clearTimeout(this.timeout);
    });
  },
  mounted() {
    this.parentMenu.addSubmenu(this);
    this.rootMenu.addSubmenu(this);
    this.initPopper();
  },
  beforeDestroy() {
    this.parentMenu.removeSubmenu(this);
    this.rootMenu.removeSubmenu(this);
  },
  render(h) {
    const {
      active,
      opened,
      paddingStyle,
      rootMenu,
      currentPlacement,
      menuTransitionName,
      mode,
      disabled,
      popperClass,
      $slots,
      isFirstLevel
    } = this;

    const popupMenu = (
      <transition name={menuTransitionName}>
        <div
          ref="menu"
          v-show={opened}
          class={[`${mode}`, popperClass]}
          on-mouseenter={($event) => this.handleMouseenter($event, 100)}
          on-mouseleave={this.handleMouseleave}
          on-focus={($event) => this.handleMouseenter($event, 100)}>
          <ul
            role="menu"
            class={['c-menu c-menu-popup', `c-menu-popup-${currentPlacement}`]}
            style={{ backgroundColor: rootMenu.backgroundColor || '' }}>
            {$slots.default}
          </ul>
        </div>
      </transition>
    );

    const inlineMenu = (
      <collapse-transition>
        <ul
          role="menu"
          class="c-menu c-menu-inline"
          v-show={opened}>
          {$slots.default}
        </ul>
      </collapse-transition>
    );

    const submenuTitleIcon = (rootMenu.mode === 'horizontal' && isFirstLevel || rootMenu.mode === 'vertical' && !rootMenu.collapse) ? 'down' : 'up';

    return (
      <li
        class={{
          'c-submenu': true,
          'active': active,
          'opened': opened,
          'disabled': disabled
        }}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={opened}
        on-mouseenter={this.handleMouseenter}
        on-mouseleave={this.handleMouseleave}
        on-focus={this.handleMouseenter}>
        <div
          class="c-submenu-title-box"
          ref="c-submenu-title"
          on-click={this.handleClick}
          on-mouseenter={this.handleTitleMouseenter}
          on-mouseleave={this.handleTitleMouseleave}
          style={[paddingStyle]}>
          {$slots.title}
          <icon name={submenuTitleIcon} class="c-submenu-toggle-icon"></icon>
        </div>
        {this.isMenuPopup ? popupMenu : inlineMenu}
      </li>
    );
  }
};
</script>
