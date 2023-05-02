<template>
    <label class="c-key-value-label">
        <span class="c-key-value-label-key">{{title}}</span>
        <span class="c-key-value-label-value">{{value}}</span>
    </label>
</template>

<script>
export default {
  name: 'CKeyValueLabel',
  props: {
    color: {
      type: String
    },
    title: {
      type: String
    },
    value: {
      type: String
    },
  }
};
</script>
