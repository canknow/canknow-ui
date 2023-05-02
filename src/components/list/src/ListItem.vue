<template>
  <div class="c-list-item">
    <template v-if="list.itemLayout === 'vertical'">
      <div class="c-list-item-main">
        <slot></slot>
        <ul class="c-list-item-actions" v-if="$slots.actions">
          <slot name="actions"></slot>
        </ul>
      </div>
      <div class="c-list-item-extra" v-if="$slots.extra">
        <slot name="extra"></slot>
      </div>
    </template>
    <template v-else>
      <slot></slot>
      <ul class="c-list-item-actions" v-if="$slots.actions">
        <slot name="actions"></slot>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: 'c-ListItem',
  inject: ['list'],
};
</script>
