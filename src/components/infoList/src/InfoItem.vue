<template>
    <li class="c-info-item">
        <label class="c-info-item-label" :style="labelStyles">{{label}}</label>
        <div class="c-info-item-content"><slot></slot></div>
    </li>
</template>

<script>
export default {
  name: 'CInfoItem',
  props: {
    labelWidth: {
      type: [String, Number]
    },
    label: {
      type: String
    }
  },
  computed: {
    labelStyles () {
      let style = {};
      const labelWidth = this.labelWidth || this.infoList.labelWidth;

      if (labelWidth) {
        style.width = `${labelWidth}px`;
      }
      return style;
    },
    infoList() {
      return this.$parent;
    },
  }
};
</script>
