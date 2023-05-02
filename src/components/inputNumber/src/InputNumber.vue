<template>
  <div class="c-input-number"
       :class="[inputNumberSize ? inputNumberSize : '', { 'disabled': inputNumberDisabled }]"
       @dragstart.prevent>
    <c-input
        ref="input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="inputNumberDisabled"
        :size="inputNumberSize"
        :max="max"
        :min="min"
        :name="name"
        :label="label"
        @keydown.up.native.prevent="increase"
        @keydown.down.native.prevent="decrease"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        @change="handleInputChange"/>
    <div class="c-input-number-controls">
      <div class="c-input-number-increase"
           role="button"
           v-repeat-click="increase"
           :class="{'disabled': maxDisabled}"
           @keydown.enter="increase">
        <icon name="up"></icon>
      </div>
      <div class="c-input-number-controls-divider"></div>
      <div class="c-input-number-decrease"
           role="button"
           v-repeat-click="decrease"
           :class="{'disabled': minDisabled}"
           @keydown.enter="decrease">
        <icon name="down"></icon>
      </div>
    </div>
  </div>
</template>
<script>
import Focus from '../../../mixins/focus';
import RepeatClick from '../../../directives/repeat-click';
import sizeComponent from '../../../mixins/sizeComponent';
import log from '../../../utils/log';

export default {
  name: 'CInputNumber',
  mixins: [Focus('input'), sizeComponent],
  inject: {
    form: {
      default: ''
    },
    formItem: {
      default: ''
    }
  },
  directives: {
    repeatClick: RepeatClick
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {},
    disabled: Boolean,
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator(value) {
        return value >= 0 && value === parseInt(value, 10);
      }
    }
  },
  data() {
    return {
      currentValue: 0,
      userInput: null
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        let newValue = value === undefined ? value : Number(value);
        if (newValue !== undefined) {
          if (isNaN(newValue)) {
            return;
          }
          if (this.stepStrictly) {
            const stepPrecision = this.getPrecision(this.step);
            const precisionFactor = Math.pow(10, stepPrecision);
            newValue = Math.round(newValue / this.step) * precisionFactor * this.step / precisionFactor;
          }
          if (this.precision !== undefined) {
            newValue = this.toPrecision(newValue, this.precision);
          }
        }
        if (newValue >= this.max) newValue = this.max;
        if (newValue <= this.min) newValue = this.min;
        this.currentValue = newValue;
        this.userInput = null;
        this.$emit('input', newValue);
      }
    }
  },
  computed: {
    minDisabled() {
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled() {
      return this._increase(this.value, this.step) > this.max;
    },
    numPrecision() {
      const { value, step, getPrecision, precision } = this;
      const stepPrecision = getPrecision(step);
      if (precision !== undefined) {
        if (stepPrecision > precision) {
          log.warn('[InputNumber]precision should not be less than the decimal places of step');
        }
        return precision;
      }
      else {
        return Math.max(getPrecision(value), stepPrecision);
      }
    },
    controlsAtRight() {
      return this.controls && this.controlsPosition === 'right';
    },
    _formItemSize() {
      return (this.formItem || {}).formItemSize;
    },
    inputNumberSize() {
      return this.size || this._formItemSize || this.$CANKNOW.config.size;
    },
    inputNumberDisabled() {
      return this.disabled || !!(this.form || {}).disabled;
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput;
      }
      let currentValue = this.currentValue;
      if (typeof currentValue === 'number') {
        if (this.stepStrictly) {
          const stepPrecision = this.getPrecision(this.step);
          const precisionFactor = Math.pow(10, stepPrecision);
          currentValue = Math.round(currentValue / this.step) * precisionFactor * this.step / precisionFactor;
        }
        if (this.precision !== undefined) {
          currentValue = currentValue.toFixed(this.precision);
        }
      }
      return currentValue;
    }
  },
  methods: {
    toPrecision(num, precision) {
      if (precision === undefined) precision = this.numPrecision;
      return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
    },
    getPrecision(value) {
      if (value === undefined) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf('.');
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    _increase(value, step) {
      if (typeof value !== 'number' && value !== undefined) return this.currentValue;
      const precisionFactor = Math.pow(10, this.numPrecision);
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return this.toPrecision((precisionFactor * value + precisionFactor * step) / precisionFactor);
    },
    _decrease(value, step) {
      if (typeof value !== 'number' && value !== undefined) return this.currentValue;
      const precisionFactor = Math.pow(10, this.numPrecision);
      return this.toPrecision((precisionFactor * value - precisionFactor * step) / precisionFactor);
    },
    increase() {
      if (this.inputNumberDisabled || this.maxDisabled) return;
      const value = this.value || 0;
      const newValue = this._increase(value, this.step);
      this.setCurrentValue(newValue);
    },
    decrease() {
      if (this.inputNumberDisabled || this.minDisabled) return;
      const value = this.value || 0;
      const newValue = this._decrease(value, this.step);
      this.setCurrentValue(newValue);
    },
    handleBlur(event) {
      this.$emit('blur', event);
    },
    handleFocus(event) {
      this.$emit('focus', event);
    },
    setCurrentValue(newValue) {
      const oldValue = this.currentValue;
      if (typeof newValue === 'number' && this.precision !== undefined) {
        newValue = this.toPrecision(newValue, this.precision);
      }
      if (newValue >= this.max) newValue = this.max;
      if (newValue <= this.min) newValue = this.min;
      if (oldValue === newValue) return;
      this.userInput = null;
      this.$emit('input', newValue);
      this.$emit('change', newValue, oldValue);
      this.currentValue = newValue;
    },
    handleInput(value) {
      this.userInput = value;
    },
    handleInputChange(value) {
      const newValue = value === '' ? undefined : Number(value);

      if (!isNaN(newValue) || value === '') {
        this.setCurrentValue(newValue);
      }
      this.userInput = null;
    },
    select() {
      this.$refs.input.select();
    }
  },
  mounted() {
    let innerInput = this.$refs.input.$refs.input;
    innerInput.setAttribute('role', 'spinbutton');
    innerInput.setAttribute('aria-valuemax', this.max);
    innerInput.setAttribute('aria-valuemin', this.min);
    innerInput.setAttribute('aria-valuenow', this.currentValue);
    innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
  },
  updated() {
    if (!this.$refs || !this.$refs.input) return;
    const innerInput = this.$refs.input.$refs.input;
    innerInput.setAttribute('aria-valuenow', this.currentValue);
  }
};
</script>
