<template>
  <div class="c-card" :class="classes">
    <div class="c-card-header" v-if="showHeader">
      <slot name="title">
        <div v-if="title">
          <icon v-if="icon" :type="icon"></icon>
          <span class="c-card-title">{{title}}</span>
        </div>
      </slot>
    </div>
    <div class="c-card-extra" v-if="showExtra"><slot name="extra"></slot></div>
    <div class="c-card-body"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'CCard',
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    shadow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
    },
    icon: {
      type: String,
    }
  },
  data () {
    return {
      showHeader: true,
      showExtra: true
    };
  },
  computed: {
    classes () {
      return [
        {
          bordered: this.bordered && !this.shadow,
          shadow: this.shadow
        }
      ];
    },
  },
  mounted () {
    this.showHeader = this.title || this.$slots.title !== undefined;
    this.showExtra = this.$slots.extra !== undefined;
  }
};
</script>
