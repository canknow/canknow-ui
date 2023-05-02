<template>
    <div class="c-portlet" :class="classes">
        <div class="c-portlet-header" v-show="showHeader">
            <slot name="header"></slot>
            <icon :name="icon" class="c-portlet-icon" v-if="icon"></icon>
            <div class="c-portlet-title">
                <template v-if="title">{{title}}</template>
                <slot name="title"></slot>
            </div>
            <div class="c-portlet-action-bar">
                <slot name="actions"></slot>
            </div>
        </div>
        <div class="c-portlet-body">
            <slot></slot>
        </div>
      <div class="c-portlet-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: 'CPortlet',
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    radius: {
      type: Boolean,
      default: true
    },
    flex: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showHeader () {
      return this.$slots.header || this.$slots.title || this.$slots.actions || this.icon || this.title;
    },
    classes () {
      return {
        radius: !!this.radius,
        flex: !!this.flex,
        padding: !!this.padding
      };
    }
  }
};
</script>