<template>
    <div class="c-section-title" :class="classes">
        <div class="c-section-title-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CSectionTitle',
  props: {
    align: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    classes () {
      return [this.align];
    }
  }
};
</script>


