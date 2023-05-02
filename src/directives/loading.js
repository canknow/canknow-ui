import Vue from 'vue';
import Loading from '../components/loading/src/Loading.vue';
import { getStyle, addClass, removeClass } from 'canknow-core/src/libs';
import afterLeave from '../utils/afterLeave';

const Mask = Vue.extend(Loading);

const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      if (binding.modifiers.fullscreen) {
        el.originalPosition = getStyle(document.body, 'position');
        el.originalOverflow = getStyle(document.body, 'overflow');

        addClass(el.mask, 'fullscreen');
        insertDom(document.body, el, binding);
      }
      else {
        removeClass(el.mask, 'fullscreen');

        if (binding.modifiers.body) {
          el.originalPosition = getStyle(document.body, 'position');

          ['top', 'left'].forEach(property => {
            const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
            el.maskStyle[property] = el.getBoundingClientRect()[property] +
                            document.body[scroll] +
                            document.documentElement[scroll] -
                            parseInt(getStyle(document.body, `margin-${ property }`), 10) +
                            'px';
          });
          ['height', 'width'].forEach(property => {
            el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
          });
          insertDom(document.body, el, binding);
        }
        else {
          el.originalPosition = getStyle(el, 'position');
          insertDom(el, el, binding);
        }
      }
    });
  }
  else {
    afterLeave(el.instance, () => {
      el.domVisible = false;
      const target = binding.modifiers.fullscreen || binding.modifiers.body
        ? document.body
        : el;
      removeClass(target, 'c-loading-parent-relative');
      removeClass(target, 'c-loading-parent-hidden');
      el.instance.hiding = false;
    }, 300, true);
    el.instance.visible = false;
    el.instance.hiding = true;
  }
};

const insertDom = (parent, el, binding) => {
  if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
    Object.keys(el.maskStyle).forEach(property => {
      el.mask.style[property] = el.maskStyle[property];
    });
    if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
      addClass(parent, 'c-loading-parent-relative');
    }
    if (binding.modifiers.fullscreen && binding.modifiers.lock) {
      addClass(parent, 'c-loading-parent-hidden');
    }
    el.domVisible = true;
    !el.isMaskAppend && parent.appendChild(el.mask);
    el.isMaskAppend = true;
    Vue.nextTick(() => {
      if (el.instance.hiding) {
        el.instance.$emit('after-leave');
      }
      else {
        el.instance.visible = true;
      }
    });
    el.domInserted = true;
  }
};

export default {
  bind (el, binding, vnode) {
    const loadingText = el.getAttribute('loading-text');
    const showMask = el.hasAttribute('mask');
    const background = el.getAttribute('loading-background');
    const vm = vnode.context;
    const mask = new Mask({
      el: document.createElement('div'),
      propsData: {
        mask: showMask
      },
      data: {
        background: vm && vm[background] || background
      }
    });
    mask.setText(loadingText);
    el.instance = mask;
    el.mask = mask.$el;
    el.maskStyle = {};
    binding.value && toggleLoading(el, binding);
  },
  update (el, binding) {
    el.instance.setText(el.getAttribute('loading-text'));
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding);
    }
  },
  unbind (el, binding) {
    if (el.domInserted) {
      el.mask &&
            el.mask.parentNode &&
            el.mask.parentNode.removeChild(el.mask);
      toggleLoading(el, { value: false, modifiers: binding.modifiers });
    }
  }
};
