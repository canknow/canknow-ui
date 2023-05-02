<template>
  <transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave">

    <div v-show="visible"
         class="c-modal-wrap"
         @click.self="handleWrapperClick">

      <div role="dialog"
           :key="key"
           aria-modal="true"
           :aria-label="title || 'dialog'"
           class="c-modal"
           :class="[{ 'is-fullscreen': fullscreen, 'match-parent': matchParent }, customClass]"
           :style="style"
           ref="dialog">

        <div class="c-modal-header" v-if="showHead">
          <div class="c-modal-header-container">
            <c-button size="small" ghost class="c-button-prev" type="icon" icon="left" @click="handleClose" v-if="fullscreen"></c-button>
            <slot name="header">
              <div class="c-modal-title">{{ title }}</div>
            </slot>
          </div>
          <c-container-close-button v-if="!fullscreen" @click="handleClose"></c-container-close-button>
        </div>
        <div class="c-modal-body" v-if="rendered"><slot></slot></div>
        <div class="c-modal-footer" v-if="!calculatedIsFooterHidden">
          <slot name="footer">
            <c-button long type="text" @click.native="handleClose">{{ localeCancelText }}</c-button>
            <c-button long scene="primary" @click.native="ok">{{ localeOkText }}</c-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from '../../../utils/popup';
import Migrating from '../../../mixins/migrating';
import emitter from 'canknow-ui-core/src/mixins/emitter';
import Locale from '../../../mixins/locale';

export default {
  name: 'CModal',
  mixins: [Locale, Popup, emitter, Migrating],
  props: {
    title: {
      type: String,
      default: ''
    },
    modal: {
      type: Boolean,
      default: true
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    width: String,
    fullscreen: Boolean,
    matchParent: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    },
    beforeClose: Function,
    destroyOnClose: Boolean,
    isFooterHidden: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showHead: true,
      closed: false,
      key: 0
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
      else {
        this.$el.removeEventListener('scroll', this.updatePopper);
        if (!this.closed) this.$emit('close');
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++;
          });
        }
      }
    }
  },
  computed: {
    localeOkText () {
      if (this.okText === undefined) {
        return this.t('core.modal.okText');
      }
      else {
        return this.okText;
      }
    },
    localeCancelText () {
      if (this.cancelText === undefined) {
        return this.t('core.modal.cancelText');
      }
      else {
        return this.cancelText;
      }
    },
    calculatedIsFooterHidden () {
      return this.isFooterHidden || this.fullscreen;
    },
    style() {
      let style = {};
      if (!this.fullscreen) {
        if (this.width) {
          style.width = this.width;
        }
      }
      return style;
    }
  },
  methods: {
    ok() {
      this.hide();
      this.$emit('ok');
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      }
      else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        this.closed = true;
      }
    },
    updatePopper() {
      this.broadcast('SelectDropdown', 'updatePopper');
      this.broadcast('DropdownMenu', 'updatePopper');
    },
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    }
  },
  mounted() {
    let showHead = true;
    if (this.$slots.header === undefined && !this.title) {
      showHead = false;
    }
    this.showHead = showHead;

    if (this.visible) {
      this.rendered = true;
      this.open();

      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
