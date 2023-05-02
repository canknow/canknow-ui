<template>
  <div :class="wrapClasses"
       class="c-input"
       @mouseenter="hovering = true"
       @mouseleave="hovering = false">

    <label class="c-input-label" v-if="label">{{label}}</label>

    <div class="c-input-pend c-input-prepend" :class="{custom: customPrepend}" v-if="prepend" v-show="slotReady">
      <slot name="prepend" class="c-input-pend c-input-prepend" v-if="prepend" v-show="slotReady"></slot>
    </div>

    <!-- 前置内容 -->
    <div class="c-input-prefix c-input-fix" v-if="$slots.prefix || frontIcon">
      <slot name="prefix"></slot>
      <icon class="c-input-icon" v-if="frontIcon" :name="frontIcon"></icon>
    </div>

    <textarea v-if="type === 'textarea'"
              :id="elementId"
              class="input-base c-input-input"
              :class="textareaClasses"
              :tabindex="tabindex"
              :autocomplete="autocomplete"
              ref="textarea"
              v-bind="$attrs"
              :style="textareaStyles"
              :placeholder="placeholder"
              :disabled="disabled"
              :readonly="readonly"
              :autofocus="autofocus"
              @compositionstart="handleCompositionStart"
              @compositionupdate="handleCompositionUpdate"
              @compositionend="handleCompositionEnd"
              @focus="handleFocus"
              @blur="handleBlur"
              @input="handleInput"
              @change="handleChange">
        </textarea>

    <div :id="elementId" :placeholder="placeholder" class="input-base c-input-input c-static-text" v-else-if="type==='static'">{{value}}</div>

    <input v-else
           :id="elementId"
           :tabindex="tabindex"
           :autocomplete="autocomplete"
           ref="input"
           v-bind="$attrs"
           class="input-base c-input-input"
           :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
           :placeholder="placeholder"
           :disabled="disabled"
           :readonly="readonly"
           :autofocus="autofocus"
           @compositionstart="handleCompositionStart"
           @compositionupdate="handleCompositionUpdate"
           @compositionend="handleCompositionEnd"
           @focus="handleFocus"
           @blur="handleBlur"
           @input="handleInput"
           @change="handleChange">

    <!-- 后置内容 -->
    <div class="c-input-suffix c-input-fix" v-if="getSuffixVisible()">
      <template>
        <template v-if="!showClear && !showPasswordVisible && !isWordLimitVisible">
          <slot name="suffix"></slot>
          <icon class="c-input-icon" v-if="endIcon" :name="endIcon"></icon>
        </template>
        <icon v-if="showClear" name="remove-circle" class="c-input-icon c-input-clear" @mousedown.prevent.native @click.native="clear"></icon>
        <icon v-if="showPasswordVisible"
              :name="passwordVisible ? 'eye-close' : 'eye-open'"
              class="c-input-icon c-input-clear"
              @click="togglePasswordVisible"></icon>
        <div v-if="isWordLimitVisible" class="input-count">
          <span class="c-input-count-inner">{{ textLength }}/{{ upperLimit }}</span>
        </div>
      </template>
      <icon class="c-input-icon c-input-validate-icon" v-if="validateState && showValidateStateIcon" :name="validateIcon"></icon>
    </div>

    <div class="c-input-pend c-input-append" :class="{ custom: customAppend }" v-if="append" v-show="slotReady">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script>
import { oneOf } from '../../../utils/assist';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import formComponent from '../../../mixins/formComponent';
import sceneIconTypes from '../../../common/sceneIconTypes';
import { isKorean } from '../../../utils/shared';
import calcTextareaHeight from './calcTextareaHeight';
import { merge } from 'canknow-core/src/libs';

export default {
  name: 'CInput',
  mixins: [ Emitter, formComponent ],
  inheritAttrs: false,
  inject: {
    form: {
      default: ''
    },
    formItem: {
      default: ''
    }
  },
  props: {
    customPrepend: {
      type: Boolean,
      default: false
    },
    customAppend: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    type: {
      validator (value) {
        return oneOf(value, ['static', 'text', 'number', 'textarea', 'password', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local', 'url', 'tel', 'email', 'color', 'search']);
      },
      default: 'text'
    },
    scene: {
      validator (value) {
        return oneOf(value, ['default', 'primary', 'success', 'danger', 'info', 'warning']);
      },
      default: 'default'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showValidateStateIcon: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number]
    },
    light: Boolean,
    maxlength: {
      type: [String, Number]
    },
    minlength: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    frontIcon: String,
    endIcon: String,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    resize: String,
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    pretty: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      validator (value) {
        return oneOf(value, ['on', 'off']);
      },
      default: 'off'
    },
    elementId: {
      type: String
    },
    wrap: {
      validator (value) {
        return oneOf(value, ['hard', 'soft']);
      },
      default: 'soft'
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    tabindex: String
  },
  data () {
    return {
      prepend: true,
      append: true,
      slotReady: false,
      hovering: false,
      focused: false,
      passwordVisible: false,
      isComposing: false,
      textareaCalculatedStyles: {},
    };
  },
  computed: {
    textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }
      return (this.value || '').length;
    },
    inputExceed() {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible && (this.textLength > this.upperLimit);
    },
    upperLimit() {
      return this.maxlength;
    },
    needStatusIcon() {
      return this.form ? this.form.statusIcon : false;
    },
    validateIcon() {
      return {
        validating: sceneIconTypes.loading,
        success: sceneIconTypes.success,
        error: sceneIconTypes.error
      }[this.validateState];
    },
    validateState() {
      return this.formItem ? this.formItem.validateState : '';
    },
    inputDisabled() {
      return this.disabled || (this.form || {}).disabled;
    },
    showPasswordVisible() {
      return this.showPassword &&
          !this.inputDisabled &&
          !this.readonly &&
          (!!this.nativeInputValue || this.focused || this.hovering);
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    showClear() {
      return this.clearable &&
          !this.inputDisabled &&
          !this.readonly &&
          this.nativeInputValue &&
          (this.focused || this.hovering);
    },
    isWordLimitVisible() {
      return this.showWordLimit &&
          this.maxlength &&
          (this.type === 'text' || this.type === 'textarea') &&
          !this.inputDisabled &&
          !this.readonly &&
          !this.showPassword;
    },
    wrapClasses () {
      return [
        `c-input-${this.type}`,
        {
          ...this.formComponentClasses,
          'c-input-group': this.append || this.prepend,
          append: this.append,
          prepend: this.prepend,
          [`${this.scene}`]: !!this.scene,
          ['pretty']: !!this.pretty,
          ['line']: !!this.line,
          ['light']: !!this.light,
          ['focused']: this.focused,
          disabled: this.inputDisabled,
          'exceed': this.inputExceed,
          'prefix': this.$slots.prefix || this.frontIcon,
          'suffix': this.$slots.suffix || this.endIcon || this.clearable || this.showPassword
        }
      ];
    },
    textareaClasses () {
      return [
        {
          ['disabled']: this.disabled
        }
      ];
    },
    textareaStyles() {
      return merge({}, this.textareaCalculatedStyles, { resize: this.resize });
    },
  },
  methods: {
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    getSuffixVisible() {
      return this.$slots.suffix ||
          this.endIcon ||
          this.showClear ||
          this.showPassword ||
          this.isWordLimitVisible ||
          (this.validateState && this.needStatusIcon);
    },
    togglePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(() => {
        this.focus();
      });
    },
    clear () {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    handleIconClick (event) {
      this.$emit('click', event);
    },
    handleFocus (event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleBlur (event) {
      this.focused = false;
      this.$emit('blur', event);

      if (this.validateEvent) {
        this.dispatch('CFormItem', 'form.blur', [this.value]);
      }
    },
    handleCompositionStart(event) {
      this.$emit('compositionstart', event);
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      this.$emit('compositionupdate', event);
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || '';
      this.isComposing = !isKorean(lastCharacter);
    },
    handleCompositionEnd(event) {
      this.$emit('compositionend', event);

      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      if (this.isComposing) {
        return;
      }

      if (event.target.value === this.nativeInputValue) return;

      this.$emit('input', event.target.value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange (event) {
      this.$emit('change', event.target.value);
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    resizeTextarea () {
      const { autosize, type } = this;
      if (type !== 'textarea') return;

      if (!autosize) {
        this.textareaCalculatedStyles = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaCalculatedStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    focus () {
      this.getInput().focus();
    },
    blur () {
      this.getInput().blur();
    }
  },
  watch: {
    value (value) {
      this.$nextTick(this.resizeTextarea);

      if (this.validateEvent) {
        this.dispatch('CFormItem', 'form.change', value);
      }
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue() {
      this.setNativeInputValue();
    },
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
        this.resizeTextarea();
      });
    },
    select() {
      this.getInput().select();
    },
  },
  created () {
    this.$on('inputSelect', this.select);
  },
  mounted () {
    if (this.type === 'textarea') {
      this.prepend = false;
      this.append = false;
    }
    else {
      this.prepend = this.$slots.prepend !== undefined;
      this.append = this.$slots.append !== undefined;
    }

    this.slotReady = true;
    this.setNativeInputValue();
    this.resizeTextarea();
  }
};
</script>
