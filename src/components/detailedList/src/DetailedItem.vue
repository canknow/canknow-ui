<template>
    <li class="c-detailed-item">
        <label class="c-detailed-item-label" :style="labelStyles">{{label}}</label>
        <div class="c-detailed-item-content"><slot></slot></div>
    </li>
</template>

<script>
export default {
  name: 'CDetailedItem',
  props: {
    labelWidth: {
      type: [String, Number]
    },
    label: {
      type: String
    },
    align: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    labelStyles () {
      let style = {};
      const labelWidth = this.labelWidth || this.list.labelWidth;

      if (labelWidth) {
        style.width = `${labelWidth}px`;
      }

      if (this.align) {
        style.textAlign = this.align;
      }
      return style;
    },
    list() {
      return this.$parent;
    },
  }
};
</script>
