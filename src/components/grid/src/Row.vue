<template>
    <component :is="tag" :class="classes" class="c-row" :style="styles">
        <slot></slot>
    </component>
</template>
<script>
import { oneOf, findComponentsDownward } from '../../../utils/assist';

export default {
  name: 'CRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    align: {
      validator (value) {
        return oneOf(value, ['top', 'middle', 'bottom']);
      }
    },
    justify: {
      validator (value) {
        return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between']);
      }
    },
    gutter: {
      type: [Number, String],
      default: 0
    },
    spaced: {
      type: Boolean,
      default: false
    },
    className: String
  },
  computed: {
    classes () {
      return [
        this.className,
        {
          spaced: !!this.spaced,
          ['flex-row']: this.type === 'flex',
          [`align-${this.align}`]: !!this.align,
          [`justify-${this.justify}`]: !!this.justify,
        }
      ];
    },
    styles () {
      let style = {};
      return style;
    }
  },
  methods: {
    updateGutter (value) {
      const Cols = findComponentsDownward(this, 'CColumn');
      if (Cols.length) {
        Cols.forEach((child) => {
          if (value !== 0) {
            child.gutter = value;
          }
        });
      }
    }
  },
  watch: {
    gutter (value) {
      this.updateGutter(value);
    }
  }
};
</script>
