<template>
  <li :class="itemClasses">
    <div :class="tailClasses"></div>
    <div :class="headClasses" :style="customColor" ref="dot">
      <slot name="dot"></slot>
    </div>
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </li>
</template>
<script>
import { oneOf } from 'canknow-ui-core/src/utils/assist';

export default {
  name: 'CTimelineItem',
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      dot: false
    };
  },
  mounted () {
    this.dot = !!this.$refs.dot.innerHTML.length;
  },
  computed: {
    itemClasses () {
      return 'c-timeline-item';
    },
    tailClasses () {
      return 'c-timeline-item-tail';
    },
    headClasses () {
      return [
        'c-timeline-item-head',
        {
          ['c-timeline-item-head-custom']: this.dot,
          [`c-timeline-item-head-${this.color}`]: this.headColorShow
        }
      ];
    },
    headColorShow () {
      return oneOf(this.color, ['primary', 'success', 'info', 'warning', 'danger']);
    },
    customColor () {
      let style = {};
      if (this.color) {
        if (!this.headColorShow) {
          style = {
            'color': this.color,
            'border-color': this.color
          };
        }
      }
      return style;
    },
    contentClasses () {
      return 'c-timeline-item-content';
    }
  }
};
</script>
