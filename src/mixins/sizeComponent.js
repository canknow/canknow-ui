import { oneOf } from 'canknow-ui-core/src/utils/assist';
import sizes from '../consts/sizes';

export default {
  props: {
    size: {
      validator (value) {
        const result = oneOf(value, sizes);

        if (!result) {
          console.log(value);
        }
        return result;
      }
    },
  },
  computed: {
    componentSize () {
      return this.size || this.$CANKNOW.config.size;
    }
  }
};
