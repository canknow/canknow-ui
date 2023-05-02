<template>
  <div class="c-list-item-meta">
    <div class="c-list-item-meta-avatar" v-if="$slots.avatar">
      <slot name="avatar"></slot>
    </div>
    <div class="c-list-item-meta-content">
      <h4 class="c-list-item-meta-title" v-if="$slots.title"><slot name="title"></slot></h4>
      <div class="c-list-item-meta-description">
        {{description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CListItemMeta',
  props: {
    description: null
  }
};
</script>
