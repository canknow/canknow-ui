<template>
    <label class="c-radio" :class="wrapClasses">
        <input
                type="radio"
                :disabled="disabled"
                :checked="currentValue"
                :name="name"
                @change="change">
        <span class="c-radio-check"></span>
        <span class="c-radio-caption" v-if="$slots.default || label"><slot>{{ label }}</slot></span>
    </label>
</template>
<script>
import { findComponentUpward } from '../../../utils/assist';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import formComponent from '../../../mixins/formComponent';

export default {
  name: 'CRadio',
  mixins: [ Emitter, formComponent ],
  inject: {
    radioGroup: {
      default: ''
    },
  },
  props: {
    value: null,
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: null,
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      group: false,
      parent: findComponentUpward(this, 'CRadioGroup')
    };
  },
  computed: {
    _radioGroupSize() {
      return (this.radioGroup || {}).formComponentSize;
    },
    formComponentSize () {
      if (this.radioGroup) {
        return this._radioGroupSize;
      }
      return this.size || this._radioGroupSize || this._formItemSize || this.$CANKNOW.config.size;
    },
    wrapClasses () {
      return [
        `c-radio-${this.type}`,
        {
          [this.formComponentSize]: !!this.formComponentSize,
          ['checked']: this.currentValue,
          ['disabled']: this.disabled
        }
      ];
    },
  },
  mounted () {
    if (this.parent) {
      this.group = true;
    }

    if (!this.group) {
      this.updateValue();
    }
    else {
      this.parent.updateValue();
    }
  },
  methods: {
    change (event) {
      if (this.disabled) {
        return false;
      }
      const checked = event.target.checked;
      this.currentValue = checked;

      let value = checked ? this.trueValue : this.falseValue;
      this.$emit('input', value);

      if (this.group && this.value !== undefined) {
        this.parent.change({
          value: this.value,
          checked: this.value
        });
      }
      if (!this.group) {
        this.$emit('change', value);
        this.dispatch('CFormItem', 'form.change', value);
      }
    },
    updateValue () {
      this.currentValue = this.value === this.trueValue;
    }
  },
  watch: {
    value (value) {
      if (value !== this.trueValue && value !== this.falseValue) {
        throw 'Value should be trueValue or falseValue.';
      }
      this.updateValue();
    }
  }
};
</script>
