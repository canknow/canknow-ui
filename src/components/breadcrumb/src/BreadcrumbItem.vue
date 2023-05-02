<template>
    <li class="c-breadcrumb-item">
        <a v-if="to || href" class="c-breadcrumb-item-link" @click="handleClick">
            <slot></slot>
        </a>
        <span v-else class="c-breadcrumb-item-link">
            <slot></slot>
        </span>
        <span role="presentation" class="c-breadcrumb-item-separator" v-if="showSeparator">{{separator}}</span>
    </li>
</template>
<script>
export default {
  name: 'CBreadcrumbItem',
  props: {
    href: {
      type: [Object, String]
    },
    to: {
      type: [Object, String]
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      separator: null
    };
  },
  computed: {
    showSeparator () {
      return this.$parent.itemStyle === 'separator';
    }
  },
  methods: {
    handleClick () {
      const isRoute = this.$router;
      
      if (isRoute) {
        this.replace ? this.$router.replace(this.to || this.href) : this.$router.push(this.to || this.href);
      }
      else {
        window.location.href = this.to || this.href;
      }
    }
  }
};
</script>
