<template>
  <transition name="message-box-fade">
    <div
      class="c-message-box-wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'">
      <div class="c-message-box" :class="[customClass]">
        <div class="c-message-box-header" v-if="title !== null">
          <div class="c-message-box-header-container">
            <div class="c-message-box-title">
              <span>{{ title }}</span>
            </div>
          </div>
          <c-container-close-button v-if="showClose"
                                  @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                                  @keydown.enter.native="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"></c-container-close-button>
        </div>
        <div class="c-message-box-content">
          <div :class="['c-message-box-status', icon]" v-if="icon && message !== ''">
          </div>
          <div class="c-message-box-message" v-if="message !== ''">
            <slot>
              <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
              <p v-else v-html="message"></p>
            </slot>
          </div>
          <div class="c-message-box-input component-span-top" v-show="showInput">
            <c-input
              v-model="inputValue"
              :type="inputType"
              block
              @keydown.enter.native="handleInputEnter"
              :placeholder="inputPlaceholder"
              ref="input"></c-input>
            <div class="c-message-box-error-message" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="c-message-box-footer">
          <c-button
            :loading="cancelButtonLoading"
            v-if="showCancelButton"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')">
            {{ cancelButtonText || t('core.messageBox.cancel') }}
          </c-button>
          <c-button
            :loading="confirmButtonLoading"
            ref="confirm"
            scene="primary"
            v-show="showConfirmButton"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')">
            {{ confirmButtonText || t('core.messageBox.confirm') }}
          </c-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from './../../../utils/popup';
import Locale from '../../../mixins/locale';
import { t } from '../../../locale';
import { addClass, removeClass } from 'canknow-core/src/libs';
import Dialog from '../../../utils/aria-dialog';

let messageBox;
let typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
};

export default {
  mixins: [Popup, Locale],
  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    closeOnHashChange: {
      default: true
    }
  },
  data() {
    return {
      uid: 1,
      title: undefined,
      message: '',
      type: '',
      iconClass: '',
      customClass: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      action: '',
      confirmButtonText: '',
      cancelButtonText: '',
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false,
      distinguishCancelAndClose: false
    };
  },
  computed: {
    icon() {
      const { type, iconClass } = this;
      return iconClass || (type && typeMap[type] ? `icon-${ typeMap[type] }` : '');
    }
  },
  methods: {
    getSafeClose() {
      const currentId = this.uid;
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose();
        });
      };
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;

      this.onClose && this.onClose();
      messageBox.closeDialog(); // 解绑
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }
      this.opened = false;
      this.doAfterClose();
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },
    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
      }
    },
    handleInputEnter() {
      if (this.inputType !== 'textarea') {
        return this.handleAction('confirm');
      }
    },
    handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      }
      else {
        this.doClose();
      }
    },
    validate() {
      if (this.$type === 'prompt') {
        const inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || t('core.messageBox.error');
          addClass(this.getInputElement(), 'invalid');
          return false;
        }
        const inputValidator = this.inputValidator;
        if (typeof inputValidator === 'function') {
          const validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || t('core.messageBox.error');
            addClass(this.getInputElement(), 'invalid');
            return false;
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult;
            addClass(this.getInputElement(), 'invalid');
            return false;
          }
        }
      }
      this.editorErrorMessage = '';
      removeClass(this.getInputElement(), 'invalid');
      return true;
    },
    getFirstFocus() {
      const btn = this.$el.querySelector('.c-message-box-footer .c-button');
      const title = this.$el.querySelector('.c-message-box-footer .c-message-box-title');
      return btn || title;
    },
    getInputElement() {
      const inputRefs = this.$refs.input.$refs;
      return inputRefs.input || inputRefs.textarea;
    },
    handleClose() {
      this.handleAction('close');
    }
  },
  watch: {
    inputValue: {
      immediate: true,
      handler(value) {
        this.$nextTick(_ => {
          if (this.$type === 'prompt' && value !== null) {
            this.validate();
          }
        });
      }
    },
    visible(value) {
      if (value) {
        this.uid++;
        if (this.$type === 'alert' || this.$type === 'confirm') {
          this.$nextTick(() => {
            this.$refs.confirm.$el.focus();
          });
        }
        this.focusAfterClosed = document.activeElement;
        messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
      }
      // prompt
      if (this.$type !== 'prompt') return;
      if (value) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.getInputElement().focus();
          }
        }, 500);
      }
      else {
        this.editorErrorMessage = '';
        removeClass(this.getInputElement(), 'invalid');
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close);
      }
    });
  },
  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close);
    }
    setTimeout(() => {
      messageBox.closeDialog();
    });
  }
};
</script>
