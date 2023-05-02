<template>
    <div class="c-switch" :class="wrapClasses" @click="toggle" :style="styles">
        <input type="hidden" :name="name" :value="currentValue">
        <div class="c-switch-inner">
            <div class="c-switch-inner-container">
                <slot name="open" v-if="currentValue === trueValue"></slot>
                <slot name="close" v-if="currentValue === falseValue"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  name: 'CSwitch',
  mixins: [ Emitter ],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
    },
    name: {
      type: String
    },
    beforeChange: {
      type: Function
    }
  },
  data () {
    return {
      currentValue: this.value
    };
  },
  computed: {
    styles () {
      const styles = {};
      if (this.width) {
        styles.width = `${this.width}px`;
      }
      return styles;
    },
    wrapClasses () {
      return [
        {
          ['checked']: this.currentValue === this.trueValue,
          ['disabled']: this.disabled,
        }
      ];
    },
  },
  methods: {
    doToggle (checked) {
      this.currentValue = checked;
      this.$emit('input', checked);
      this.$emit('change', checked);
      this.dispatch('CFormItem', 'form.change', checked);
    },
    toggle () {
      if (this.disabled) {
        return false;
      }
      const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

      if (this.beforeChange) {
        this.beforeChange(checked).then(() => {
          this.doToggle(checked);
        });
      }
      else {
        this.doToggle(checked);
      }
    }
  },
  watch: {
    value (value) {
      if (value !== this.trueValue && value !== this.falseValue) {
        throw 'Value should be trueValue or falseValue.';
      }
      this.currentValue = value;
    }
  }
};
</script>

