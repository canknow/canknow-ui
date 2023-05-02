export default {
  props: {
    size: {
      type: String,
      default: 'medium',
      validator (value) {
        return ['large', 'small', 'medium'].indexOf(value) !== -1;
      }
    },
    shape: {
      type: String,
      default: 'square',
      validator (value) {
        return ['default', 'circle', 'square', 'round'].indexOf(value) !== -1;
      }
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};