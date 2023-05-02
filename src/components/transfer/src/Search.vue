<template>
    <div :class="prefixClass">
        <c-input
                v-model="currentQuery"
                block
                :icon="icon"
                :placeholder="placeholder"
                @-click="handleClick"></c-input>
    </div>
</template>
<script>
import CInput from '../../input/src/Input.vue';

export default {
  name: 'Search',
  components: { CInput },
  props: {
    prefixClass: String,
    placeholder: String,
    query: String
  },
  data () {
    return {
      currentQuery: this.query
    };
  },
  watch: {
    query (value) {
      this.currentQuery = value;
    },
    currentQuery (value) {
      this.$emit('query-change', value);
    }
  },
  computed: {
    icon () {
      return this.query === '' ? 'ios-search' : 'ios-close';
    }
  },
  methods: {
    handleClick () {
      if (this.currentQuery === '') return;
      this.currentQuery = '';
      this.$emit('query-clear');
    }
  }
};
</script>