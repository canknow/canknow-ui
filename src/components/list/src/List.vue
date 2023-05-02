<template>
  <div class="c-list" :class="classes">
    <c-row v-if="grid" :gutter="grid.gutter">
      <c-column :span="grid.column" v-for="(item, index) in dataSource" :key="index">
        <slot name="renderItem" :item="item" :index="index"></slot>
      </c-column>
    </c-row>
    <div class="c-list-items" v-else>
      <template v-for="(item, index) in dataSource">
        <slot name="renderItem" :item="item" :index="index"></slot>
      </template>
    </div>
    <slot name="loadMore"></slot>
  </div>
</template>

<script>
export default {
  name: 'CList',
  provide () {
    return {
      list: this
    };
  },
  props: {
    dataSource: {
      type: Array,
      default () {
        return [];
      }
    },
    bordered: {
      type: Boolean,
      default: false
    },
    split: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: [Boolean, Object],
      default: false
    },
    grid: {
      type: Object
    },
    itemLayout: {
      type: String,
      default: 'horizontal'
    }
  },
  data () {
    return {

    };
  },
  computed: {
    classes() {
      return [
        {
          split: this.split,
          grid: this.grid
        },
        this.itemLayout
      ];
    }
  }
};
</script>
