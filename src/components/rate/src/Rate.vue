<template>
  <div class="c-rate" :readonly="readonly" @mouseleave="mouseleave()">
    <span v-for="n in 5" :key="n" @click="setValue(n)" :class="starClasses(n)" @mouseover="mouseover(n)">
      <icon name="star-fill"></icon>
    </span>
    <span v-if="showText" class="c-rate-value">{{value}}</span>
  </div>
</template>

<script>
export default {
  name: 'CRate',
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      mouseValue: false
    };
  },
  methods: {
    setValue(value) {
      if (this.readonly) {
        return;
      }
      this.$emit('input', value);
      this.$emit('change', value);
      let event = document.createEvent('CustomEvent');
      event.initCustomEvent('setValue', true, true, this.value);
      this.$el.dispatchEvent(event);
    },
    mouseover(n) {
      if (this.readonly) {
        return;
      }
      this.mouseValue = n;
    },
    mouseleave() {
      if (this.readonly) {
        return;
      }
      this.mouseValue = false;
    },
    starClasses(n) {
      let v = this.mouseValue || Number(this.value);
      return {
        'rate-on': v >= n,
        'rate-off': v < n
      };
    }
  },
  filters: {
    isInclude(key, value) {
      return value.includes(key);
    }
  },
  computed: {
  }
};
</script>
