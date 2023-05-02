<template>
  <div class="c-form-item" :class="classes">
    <label class="c-form-item-label"
           :for="labelFor"
           :style="labelStyles"
           v-if="label || $slots.label">
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="c-form-item-body" :style="contentStyles">
      <div class="c-form-item-content">
        <slot></slot>
        <transition name="zoom-in-top">
          <div class="c-form-item-error-tip" v-if="validateState === 'error' && showMessage && form.showMessage">{{ validateMessage }}</div>
        </transition>
        <slot name="extra"></slot>
      </div>
      <p class="c-form-item-help" v-if="$slots.help"><slot name="help"></slot></p>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import { getPropByPath } from 'canknow-core/src/libs';

export default {
  name: 'CFormItem',
  mixins: [ Emitter ],
  provide() {
    return {
      formItem: this
    };
  },
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: [String, Number]
    },
    prop: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, Array]
    },
    error: {
      type: String
    },
    validateStatus: {
      type: Boolean
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    for: String,
    size: String
  },
  data () {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false,
    };
  },
  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value;
        this.validateState = value ? 'error' : '';
      }
    },
    validateStatus (value) {
      this.validateState = value;
    },
    rules(value) {
      if ((!value || value.length === 0) && this.required === undefined) {
        this.clearValidate();
      }
    }
  },
  computed: {
    isRequired() {
      let rules = this.getRules();
      let isRequired = false;

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true;
            return false;
          }
          return true;
        });
      }
      return isRequired;
    },
    labelFor() {
      return this.for || this.prop;
    },
    _formSize() {
      return this.form.size;
    },
    formItemSize() {
      return this.size || this._formSize;
    },
    componentSize() {
      return this.formItemSize || this.$CANKNOW.config.size;
    },
    classes () {
      return [
        this.componentSize,
        {
          'c-form-item-feedback': this.form && this.form.statusIcon,
          'error': this.validateState === 'error',
          'validating': this.validateState === 'validating',
          'success': this.validateState === 'success',
          'required': this.isRequired || this.required
        }
      ];
    },
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;

      while (parentName !== 'CForm') {
        if (parentName === 'CFormItem') {
          this.isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    fieldValue() {
      const model = this.form.model;

      if (!model || !this.prop) {
        return;
      }

      let path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      return getPropByPath(model, path, true).v;
    },
    labelStyles () {
      let style = {};
      const labelWidth = this.labelWidth || this.form.labelWidth;

      if (labelWidth) {
        style.width = `${labelWidth}px`;
      }
      return style;
    },
    contentStyles () {
      let style = {};
      return style;
    }
  },
  methods: {
    getRules () {
      let formRules = this.form.rules;
      const selfRules = this.rules;
      const requiredRule = this.required !== undefined ? { required: !!this.required } : [];

      const prop = getPropByPath(formRules, this.prop || '');
      formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    getFilteredRule (trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    validate(trigger, callback = function () {}) {
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);

      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }
      this.validateState = 'validating';

      const descriptor = {};

      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage, invalidFields);
        this.form && this.form.$emit('validate', this.prop, !errors, this.validateMessage || null);
      });
    },
    clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    resetField () {
      this.validateState = '';
      this.validateMessage = '';

      let model = this.form.model;
      let value = this.fieldValue;
      let path = this.prop;

      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      let prop = getPropByPath(model, path);
      this.validateDisabled = true;

      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue);
      }
      else {
        prop.o[prop.k] = this.initialValue;
      }

      // reset validateDisabled after onFieldChange triggered
      this.$nextTick(() => {
        this.validateDisabled = false;
      });

      this.broadcast('CTimeSelect', 'fieldReset', this.initialValue);
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }
      this.validate('change');
    },
    addValidateEvents() {
      const rules = this.getRules();

      if (rules.length || this.required !== undefined) {
        this.$on('form.blur', this.onFieldBlur);
        this.$on('form.change', this.onFieldChange);
      }
    },
  },
  mounted () {
    if (this.prop) {
      this.dispatch('CForm', 'form.addField', this);

      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });

      this.addValidateEvents();
    }
  },
  beforeDestroy () {
    this.dispatch('CForm', 'form.removeField', this);
  }
};
</script>
