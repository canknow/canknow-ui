<template>
    <div v-transfer-dom :data-transfer="transfer">
        <transition name="fade">
            <div :class="maskClasses" :style="maskStyle" v-show="visible" v-if="mask" @click="handleMask"></div>
        </transition>
        <div :class="wrapClasses" @click="handleWrapClick">
            <transition :name="'move-' + placement">
                <div :class="classes" :style="mainStyles" v-show="visible">
                    <div :class="contentClasses" ref="content">
                        <div :class="[prefixClass + '-header']" v-if="showHead">
                          <slot name="header">
                            <div :class="[prefixClass + '-header-inner']">{{ title }}</div>
                            <c-container-close-button v-if="closable" @click="close"></c-container-close-button>
                          </slot>
                        </div>
                        <div :class="[prefixClass + '-body']" :style="styles"><slot></slot></div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { oneOf, findBrothersComponents, findComponentUpward } from '../../../utils/assist';
import TransferDom from 'canknow-ui-core/src/directives/transfer-dom';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import ScrollbarMixins from '../../modal/src/mixins-scrollbar';

const prefixClass = 'c-drawer';

export default {
  name: 'CDrawer',
  mixins: [ Emitter, ScrollbarMixins ],
  directives: { TransferDom },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 256
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskStyle: {
      type: Object
    },
    styles: {
      type: Object
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    placement: {
      validator (value) {
        return oneOf(value, ['left', 'right']);
      },
      default: 'right'
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    transfer: {
      type: Boolean,
      default () {
        return true;
      }
    },
    className: {
      type: String
    },
    inner: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixClass: prefixClass,
      visible: this.value,
      wrapShow: false,
      showHead: true,
    };
  },
  computed: {
    wrapClasses () {
      return [
        `${prefixClass}-wrap`,
        {
          [`${prefixClass}-hidden`]: !this.wrapShow,
          [`${this.className}`]: !!this.className,
          [`${prefixClass}-no-mask`]: !this.mask,
          [`${prefixClass}-wrap-inner`]: this.inner
        }
      ];
    },
    mainStyles () {
      let style = {};

      const width = parseInt(this.width);

      const styleWidth = {
        width: width <= 100 ? `${width}%` : `${width}px`
      };

      Object.assign(style, styleWidth);

      return style;
    },
    contentClasses () {
      return [
        `${prefixClass}-content`,
        {
          [`${prefixClass}-content-no-mask`]: !this.mask
        }
      ];
    },
    classes () {
      return [
        `${prefixClass}`,
        `${prefixClass}-${this.placement}`,
        {
          [`${prefixClass}-no-header`]: !this.showHead,
          [`${prefixClass}-inner`]: this.inner
        }
      ];
    },
    maskClasses () {
      return [
        `${prefixClass}-mask`,
        {
          [`${prefixClass}-mask-inner`]: this.inner
        }
      ];
    }
  },
  methods: {
    close () {
      this.visible = false;
      this.$emit('input', false);
      this.$emit('close');
    },
    handleMask () {
      if (this.maskClosable && this.mask) {
        this.close();
      }
    },
    handleWrapClick (event) {
      // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
      const className = event.target.getAttribute('class');
      if (className && className.indexOf(`${prefixClass}-wrap`) > -1) {
        this.handleMask();
      }
    },
  },
  mounted () {
    if (this.visible) {
      this.wrapShow = true;
    }

    let showHead = true;

    if (this.$slots.header === undefined && !this.title) {
      showHead = false;
    }

    this.showHead = showHead;
  },
  beforeDestroy () {
    this.removeScrollEffect();
  },
  watch: {
    value (value) {
      this.visible = value;
    },
    visible (value) {
      if (value === false) {
        this.timer = setTimeout(() => {
          this.wrapShow = false;
          // #4831 Check if there are any drawers left at the parent level
          const brotherDrawers = findBrothersComponents(this, 'Drawer') || [];
          const parentDrawers = findComponentUpward(this, 'Drawer') || [];

          const otherDrawers = [].concat(brotherDrawers).concat(parentDrawers);

          const isScrollDrawer = otherDrawers.some(item => item.visible && !item.scrollable);

          if (!isScrollDrawer) {
            this.removeScrollEffect();
          }
        }, 300);
      }
      else {
        if (this.timer) clearTimeout(this.timer);
        this.wrapShow = true;
        if (!this.scrollable) {
          this.addScrollEffect();
        }
      }
      this.broadcast('Table', 'visible-change', value);
      this.broadcast('Slider', 'visible-change', value);  // #2852
      this.$emit('visible-change', value);
    },
    scrollable (value) {
      if (!value) {
        this.addScrollEffect();
      }
      else {
        this.removeScrollEffect();
      }
    },
    title (value) {
      if (this.$slots.header === undefined) {
        this.showHead = !!value;
      }
    }
  }
};
</script>
