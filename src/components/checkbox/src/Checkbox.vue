<template>
  <label
      class="c-checkbox"
      :class="[
      border && checkboxSize ? 'checkbox-' + checkboxSize : '',
      { 'disabled': isDisabled },
      { 'bordered': border },
      { 'checked': isChecked }
    ]" :id="id">
    <span class="c-checkbox-input" :class="{
      'disabled': isDisabled,
        'checked': isChecked,
        'indeterminate': indeterminate,
        'focus': focus
    }"
          :tabindex="indeterminate ? 0 : false"
          :role="indeterminate ? 'checkbox' : false"
          :aria-checked="indeterminate ? 'mixed' : false">
      <span class="c-checkbox-inner"></span>
      <input
          v-if="trueLabel || falseLabel"
          class="c-checkbox-original"
          type="checkbox"
          :aria-hidden="indeterminate ? 'true' : 'false'"
          :name="name"
          :disabled="isDisabled"
          :true-value="trueLabel"
          :false-value="falseLabel"
          v-model="model"
          @change="handleChange"
          @focus="focus = true"
          @blur="focus = false">
      <input
          v-else
          class="c-checkbox-original"
          type="checkbox"
          :aria-hidden="indeterminate ? 'true' : 'false'"
          :disabled="isDisabled"
          :value="label"
          :name="name"
          v-model="model"
          @change="handleChange"
          @focus="focus = true"
          @blur="focus = false">
    </span>
    <span class="c-checkbox-label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  name: 'CCheckbox',
  mixins: [Emitter],
  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean,
    size: String
  },
  inject: {
    form: {
      default: ''
    },
    formItem: {
      default: ''
    }
  },
  componentName: 'CCheckbox',
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
      },
      set(value) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          (this._checkboxGroup.min !== undefined && value.length < this._checkboxGroup.min && (this.isLimitExceeded = true));
          (this._checkboxGroup.max !== undefined && value.length > this._checkboxGroup.max && (this.isLimitExceeded = true));
          this.isLimitExceeded === false && this.dispatch('CCheckboxGroup', 'input', [value]);
        }
        else {
          this.$emit('input', value);
          this.selfModel = value;
        }
      }
    },
    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      }
      else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      }
      else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'CCheckboxGroup') {
          parent = parent.$parent;
        }
        else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return !!(max || min) && (this.model.length >= max && !this.isChecked) || (this.model.length <= min && this.isChecked);
    },
    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled || (this.form || {}).disabled || this.isLimitDisabled
        : this.disabled || (this.form || {}).disabled;
    },
    _formItemSize() {
      return (this.formItem || {}).formItemSize;
    },
    checkboxSize() {
      const temCheckboxSize = this.size || this._formItemSize || this.$CANKNOW.config.size;
      return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize;
    }
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      }
      else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) {
        return;
      }
      let value;

      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      }
      else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch('CCheckboxGroup', 'change', [this._checkboxGroup.value]);
        }
      });
    }
  },
  created() {
    this.checked && this.addToStore();
  },
  mounted() { // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  },
  watch: {
    value(value) {
      this.dispatch('CFormItem', 'form.change', value);
    }
  }
};
</script>
