import sizeComponent from './sizeComponent';

export default {
  mixins: [sizeComponent],
  props: {
    name: String,
    block: Boolean,
    border: Boolean,
    circle: Boolean,
    radius: {
      type: Boolean,
      default: true
    },
  },
  inject: {
    form: {
      default: ''
    },
    formItem: {
      default: ''
    }
  },
  computed: {
    _formItemSize() {
      return (this.formItem || {}).formItemSize;
    },
    formComponentSize () {
      return this.size || this._formItemSize || this.$CANKNOW.config.size;
    },
    formComponentClasses () {
      return {
        [this.formComponentSize]: !!this.formComponentSize,
        ['circle']: !!this.circle,
        ['block']: !!this.block,
        ['radius']: !!this.radius,
      };
    }
  }
};
