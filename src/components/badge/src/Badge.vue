<template>
    <span v-if="dot" class="c-badge" ref="badge">
        <slot></slot>
        <sup class="c-badge-dot" v-show="badge"></sup>
    </span>
    <span v-else class="c-badge" ref="badge">
        <slot></slot>
        <sup v-if="count" class="c-badge-count" :class="countClasses" v-show="badge">{{ finalCount }}</sup>
    </span>
</template>
<script>
export default {
  name: 'CBadge',
  props: {
    count: [Number, String],
    dot: {
      type: Boolean,
      default: false
    },
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    className: String
  },
  computed: {
    countClasses () {
      return [
        {
          [`${this.className}`]: !!this.className,
          alone: this.alone
        }
      ];
    },
    finalCount () {
      return parseInt(this.count) >= parseInt(this.overflowCount) ? `${this.overflowCount}+` : this.count;
    },
    badge () {
      let status = false;
      if (this.count) {
        status = !(parseInt(this.count) === 0);
      }
      if (this.dot) {
        status = true;
        if (this.count !== null) {
          if (parseInt(this.count) === 0) {
            status = false;
          }
        }
      }
      return status;
    },
    alone () {
      return this.$slots.default === undefined;
    }
  }
};
</script>