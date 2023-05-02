import { oneOf } from 'canknow-ui-core/src/utils/assist';

export default {
  props: {
    scene: {
      validator (value) {
        return oneOf(value, ['default', 'dark', 'light', 'gray', 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'default']);
      },
      default: 'default'
    },
  }
};
