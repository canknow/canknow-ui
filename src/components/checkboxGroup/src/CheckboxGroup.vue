<template>
  <div class="c-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  name: 'CCheckboxGroup',
  componentName: 'CCheckboxGroup',
  mixins: [Emitter],
  inject: {
    formItem: {
      default: ''
    }
  },
  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },
  computed: {
    _formItemSize() {
      return (this.formItem || {}).formItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._formItemSize || this.$CANKNOW.config.size;
    }
  },
  watch: {
    value(value) {
      this.dispatch('CFormItem', 'form.change', [value]);
    }
  }
};
</script>
