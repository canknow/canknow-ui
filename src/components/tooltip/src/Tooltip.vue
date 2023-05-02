<script type="text/jsx">
import Popper from './../../../utils/vue-popper';
import { debounce } from 'canknow-core/src/libs';
import { generateId } from '../../../utils/util';
import { addClass, removeClass, on, off } from 'canknow-core/src/libs';
import Vue from 'vue';

export default {
  name: 'CTooltip',
  mixins: [Popper],
  props: {
    openDelay: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    manual: Boolean,
    effect: {
      type: String,
      default: 'dark'
    },
    arrowOffset: {
      type: Number,
      default: 0
    },
    popperClass: String,
    content: {
      type: [String, Number, Boolean]
    },
    visibleArrow: {
      default: true
    },
    transition: {
      type: String,
      default: 'fade-in-linear'
    },
    popperOptions: {
      default() {
        return {
          boundariesPadding: 10,
          gpuAcceleration: false
        };
      }
    },
    enterable: {
      type: Boolean,
      default: true
    },
    hideAfter: {
      type: Number,
      default: 0
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tooltipId: `tooltip-${generateId()}`,
      timeoutPending: null,
      focusing: false
    };
  },
  beforeCreate() {
    this.popperVM = new Vue({
      data: { node: '' },
      render(h) {
        return this.node;
      }
    }).$mount();
    this.debounceClose = debounce(() => this.handleClosePopper(), 200);
  },

  render(h) {
    if (this.popperVM) {
      this.popperVM.node = (
        <transition name={ this.transition } onAfterLeave={ this.doDestroy }>
          <div onMouseleave={ () => {
            this.setExpectedState(false); this.debounceClose();
          } } onMouseenter= { () => {
            this.setExpectedState(true);
          } }
          ref="popper"
          role="tooltip"
          id={this.tooltipId}
          aria-hidden={ (this.disabled || !this.showPopper) ? 'true' : 'false' }
          v-show={!this.disabled && this.showPopper}
          class={['c-tooltip-popper', this.effect, this.popperClass]}>
            { this.$slots.content || this.content }
          </div>
        </transition>);
    }

    const firstElement = this.getFirstElement();

    if (!firstElement) {
      return null;
    }

    const data = firstElement.data = firstElement.data || {};
    data.staticClass = this.addTooltipClass(data.staticClass);

    return firstElement;
  },

  mounted() {
    this.referenceElement = this.$el;

    if (this.$el.nodeType === 1) {
      this.$el.setAttribute('aria-describedby', this.tooltipId);
      this.$el.setAttribute('tabindex', this.tabindex);
      on(this.referenceElement, 'mouseenter', this.show);
      on(this.referenceElement, 'mouseleave', this.hide);
      on(this.referenceElement, 'focus', () => {
        if (!this.$slots.default || !this.$slots.default.length) {
          this.handleFocus();
          return;
        }
        const instance = this.$slots.default[0].componentInstance;

        if (instance && instance.focus) {
          instance.focus();
        }
        else {
          this.handleFocus();
        }
      });
      on(this.referenceElement, 'blur', this.handleBlur);
      on(this.referenceElement, 'click', this.removeFocusing);
    }
    // fix issue https://github.com/ElemeFE/element/issues/14424
    if (this.value && this.popperVM) {
      this.popperVM.$nextTick(() => {
        if (this.value) {
          this.updatePopper();
        }
      });
    }
  },
  watch: {
    focusing(value) {
      if (value) {
        addClass(this.referenceElement, 'focusing');
      }
      else {
        removeClass(this.referenceElement, 'focusing');
      }
    }
  },
  methods: {
    show() {
      this.setExpectedState(true);
      this.handleShowPopper();
    },
    hide() {
      this.setExpectedState(false);
      this.debounceClose();
    },
    handleFocus() {
      this.focusing = true;
      this.show();
    },
    handleBlur() {
      this.focusing = false;
      this.hide();
    },
    removeFocusing() {
      this.focusing = false;
    },

    addTooltipClass(prev) {
      if (!prev) {
        return 'c-tooltip';
      }
      else {
        return 'c-tooltip ' + prev.replace('c-tooltip', '');
      }
    },

    handleShowPopper() {
      if (!this.expectedState || this.manual) return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showPopper = true;
      }, this.openDelay);

      if (this.hideAfter > 0) {
        this.timeoutPending = setTimeout(() => {
          this.showPopper = false;
        }, this.hideAfter);
      }
    },

    handleClosePopper() {
      if (this.enterable && this.expectedState || this.manual) return;
      clearTimeout(this.timeout);

      if (this.timeoutPending) {
        clearTimeout(this.timeoutPending);
      }
      this.showPopper = false;

      if (this.disabled) {
        this.doDestroy();
      }
    },

    setExpectedState(expectedState) {
      if (expectedState === false) {
        clearTimeout(this.timeoutPending);
      }
      this.expectedState = expectedState;
    },

    getFirstElement() {
      const slots = this.$slots.default;
      if (!Array.isArray(slots)) {
        return null;
      }
      let element = null;

      for (let index = 0; index < slots.length; index++) {
        if (slots[index] && slots[index].tag) {
          element = slots[index];
          break;
        }
      }
      return element;
    }
  },

  beforeDestroy() {
    this.popperVM && this.popperVM.$destroy();
  },

  destroyed() {
    const reference = this.referenceElement;

    if (reference.nodeType === 1) {
      off(reference, 'mouseenter', this.show);
      off(reference, 'mouseleave', this.hide);
      off(reference, 'focus', this.handleFocus);
      off(reference, 'blur', this.handleBlur);
      off(reference, 'click', this.removeFocusing);
    }
  }
};
</script>
