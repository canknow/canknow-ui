<template>
    <div class="c-transfer-operation">
        <c-button class="margin-bottom-1" icon="prev" scene="primary" :disabled="!rightActive" @click.native="moveToLeft">
            <span v-if="operations[0]">{{ operations[0] }}</span>
        </c-button>
        <c-button scene="primary" icon="next" :disabled="!leftActive" @click.native="moveToRight">
           <span v-if="operations[1]">{{ operations[1] }}</span>
        </c-button>
    </div>
</template>
<script>
export default {
  name: 'Operation',
  props: {
    prefixClass: String,
    operations: Array,
    leftActive: Boolean,
    rightActive: Boolean
  },
  methods: {
    moveToLeft () {
      this.$parent.moveTo('left');
    },
    moveToRight () {
      this.$parent.moveTo('right');
    }
  }
};
</script>
