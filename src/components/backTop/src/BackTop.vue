<template>
  <transition name="fade">
    <div :class="classes"
         class="c-back-top"
         :style="styles"
         @click="back"
         :data-transfer="transfer"
         v-show="backTop">
      <slot>
        <div class="c-back-top-inner">
          <icon name="back-up"></icon>
        </div>
      </slot>
    </div>
  </transition>
</template>

<script>
import { scrollTop } from 'canknow-core/src/libs';
import TransferDom from 'canknow-ui-core/src/directives/transfer-dom';

export default {
  name: 'CBackTop',
  props: {
    height: {
      type: Number,
      default: 400
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  directives: { TransferDom },
  data () {
    return {
      backTop: false,
      transfer: true
    };
  },
  computed: {
    classes () {
      return [
        {
          ['back-top-show']: this.backTop
        }
      ];
    },
    styles () {
      return {
      };
    }
  },
  methods: {
    handleScroll () {
      this.backTop = window.pageYOffset >= this.height;
    },
    back () {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop(window, sTop, 0, this.duration);
      this.$emit('click');
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, false);
    window.addEventListener('resize', this.handleScroll, false);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, false);
    window.removeEventListener('resize', this.handleScroll, false);
  },
};
</script>

