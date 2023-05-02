<template>
    <component :is="tag" :class="classes">
        <slot></slot>
    </component>
</template>
<script>
import { findComponentUpward } from '../../../utils/assist';

export default {
  name: 'CColumn',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: [Number, String],
    order: [Number, String],
    offset: [Number, String],
    push: [Number, String],
    pull: [Number, String],
    className: String,
    xs: [Number, Object, String],
    sm: [Number, Object, String],
    md: [Number, Object, String],
    lg: [Number, Object, String],
    xl: [Number, Object, String]
  },
  data () {
    return {
      gutter: 0
    };
  },
  computed: {
    classes () {
      let classList = [];

      ['span', 'offset', 'pull', 'push'].forEach(prop => {
        if (this[prop] || this[prop] === 0) {
          classList.push(prop !== 'span' ? `c-column-${prop}-${this[prop]}` : `c-column-${this[prop]}`);
        }
      });

      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        if (typeof this[size] === 'number') {
          classList.push(`c-column-${size}-${this[size]}`);
        }
        else if (typeof this[size] === 'object') {
          let props = this[size];
          Object.keys(props).forEach(prop => {
            classList.push(
              prop !== 'span'
                ? `c-column-${size}-${prop}-${props[prop]}`
                : `c-column-${size}-${props[prop]}`
            );
          });
        }
      });
      if (this.gutter !== 0) {
        let value = 1;
        if (this.gutter === 1) {
          value= 'half';
        }
        else {
          value = this.gutter / 2;
        }
        classList.push(`padding-${value}`);
        classList.push('no-padding-top');
        classList.push('no-padding-bottom');
      }
      classList.push({
        [`c-column-order-${this.order}`]: this.order,
        [`${this.className}`]: !!this.className,
      });
      return classList;
    }
  },
  methods: {
    updateGutter () {
      const Row = findComponentUpward(this, 'CRow');

      if (Row) {
        Row.updateGutter(Row.gutter);
      }
    }
  },
  mounted () {
    this.updateGutter();
  },
  beforeDestroy () {
    this.updateGutter();
  }
};
</script>
