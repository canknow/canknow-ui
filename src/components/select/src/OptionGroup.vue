<template>
  <ul class="c-select-group-wrap" v-show="visible">
    <li class="c-select-group-title">{{ label }}</li>
    <li>
      <ul class="c-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  mixins: [Emitter],
  name: 'COptionGroup',
  componentName: 'COptionGroup',
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    };
  },
  watch: {
    disabled(value) {
      this.broadcast('COption', 'handleGroupDisabled', value);
    }
  },
  methods: {
    queryChange() {
      this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
    }
  },
  created() {
    this.$on('queryChange', this.queryChange);
  },
  mounted() {
    if (this.disabled) {
      this.broadcast('COption', 'handleGroupDisabled', this.disabled);
    }
  }
};
</script>
