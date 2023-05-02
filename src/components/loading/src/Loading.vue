<template>
    <transition name="fade" @after-leave="handleAfterLeave">
        <div class="c-loading" :class="classes" v-if="visible">
            <div class="c-loading-box">
                <c-spinner></c-spinner>
                <div class="c-loading-text"><slot>{{textData}}</slot></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'CLoading',
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    text: {
      type: String
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      textData: null,
      visible: true
    };
  },
  watch: {
    text (value) {
      this.textData = value;
    }
  },
  computed: {
    showText () {
      return this.textData || this.$slots.default !== undefined;
    },
    classes () {
      return [
        {
          mask: this.mask,
          light: this.mask,
          ['show-text']: this.showText,
          fullscreen: this.fullscreen
        }
      ];
    }
  },
  methods: {
    setText (text) {
      this.textData = text;
    },
    handleAfterLeave () {
      this.$emit('after-leave');
    }
  },
  mounted () {
    this.textData = this.text;
  }
};
</script>

