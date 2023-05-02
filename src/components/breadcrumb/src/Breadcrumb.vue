<template>
    <div class="c-breadcrumb" :class="classes">
        <ul class="c-breadcrumb-list">
            <slot></slot>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'CBreadcrumb',
  props: {
    itemStyle: {
      type: String,
      default: 'separator'
    },
    separator: {
      type: String,
      default: '/'
    }
  },
  computed: {
    classes () {
      return [this.itemStyle];
    }
  },
  mounted () {
    this.updateChildren();
  },
  updated () {
    this.$nextTick(() => {
      this.updateChildren();
    });
  },
  methods: {
    updateChildren () {
      this.$children.forEach((child) => {
        child.separator = this.separator;
      });
    }
  },
  watch: {
    separator () {
      this.updateChildren();
    }
  }
};
</script>
