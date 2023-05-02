<template>
    <div class="c-radio-group" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
import { oneOf, findComponentsDownward } from '../../../utils/assist';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import formComponent from '../../../mixins/formComponent';

export default {
  name: 'CRadioGroup',
  mixins: [ Emitter, formComponent ],
  provide () {
    return {
      radioGroup: this
    };
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    type: {
      validator (value) {
        return oneOf(value, ['button']);
      }
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      children: []
    };
  },
  computed: {
    classes () {
      return [
        {
          [`${this.size}`]: !!this.size,
          [`${this.type}`]: !!this.type,
          vertical: this.vertical
        }
      ];
    }
  },
  mounted () {
    this.updateValue();
  },
  methods: {
    updateValue () {
      const value = this.value;
      this.children = findComponentsDownward(this, 'CRadio');

      if (this.children) {
        this.children.forEach(child => {
          child.currentValue = value === child.value;
          child.group = true;
        });
      }
    },
    change (data) {
      this.currentValue = data.value;
      this.updateValue();
      this.$emit('input', data.value);
      this.$emit('change', data.value);
      this.dispatch('CFormItem', 'form.change', data.value);
    }
  },
  watch: {
    value () {
      this.updateValue();
    }
  }
};
</script>
