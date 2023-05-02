<template>
    <form class="c-form" :class="classes" :autocomplete="autocomplete">
        <slot></slot>
    </form>
</template>
<script>
import { oneOf } from 'canknow-ui-core/src/utils/assist';

export default {
  name: 'CForm',
  provide() {
    return {
      form: this
    };
  },
  props: {
    size: String,
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    labelWidth: {
      type: [Number, String]
    },
    labelPosition: {
      validator (value) {
        return oneOf(value, ['left', 'right', 'top']);
      }
    },
    type: {
      type: String,
      validator (value) {
        return oneOf(value, ['vertical', 'horizontal', 'inline']);
      },
      default: 'horizontal'
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    autocomplete: {
      validator (value) {
        return oneOf(value, ['on', 'off']);
      },
      default: 'off'
    },
    statusIcon: Boolean,
  },
  data () {
    return {
      fields: []
    };
  },
  computed: {
    classes () {
      return [
        {
          [`c-form-label-${this.labelPosition}`]: !!this.labelPosition
        },
        this.type
      ];
    }
  },
  methods: {
    resetFields() {
      if (!this.model) {
        console.warn('[Canknow Warn][Form]model is required for resetFields to work.');
        return;
      }
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    clearValidate(props = []) {
      const fields = props.length ? (typeof props === 'string'
        ? this.fields.filter(field => props === field.prop)
        : this.fields.filter(field => props.indexOf(field.prop) > -1)
      ) : this.fields;
      fields.forEach(field => {
        field.clearValidate();
      });
    },
    validate(callback) {
      if (!this.model) {
        console.warn('[Canknow Warn][Form]model is required for validate to work!');
        return;
      }

      let promise;
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function(valid, invalidFields) {
            valid ? resolve(valid) : reject(invalidFields);
          };
        });
      }

      let valid = true;
      let count = 0;

      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      let invalidFields = {};
      this.fields.forEach(field => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = Object.assign({}, invalidFields, field);
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },
    validateField(props, cb) {
      props = [].concat(props);
      const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1);
      if (!fields.length) {
        console.warn('[Canknow Warn]please pass correct props!');
        return;
      }

      fields.forEach(field => {
        field.validate('', cb);
      });
    },
  },
  watch: {
    rules() {
      this.validate();
    }
  },
  created () {
    this.$on('form.addField', (field) => {
      if (field) {
        this.fields.push(field);
      }
      return false;
    });
    this.$on('form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
      return false;
    });
  }
};
</script>
