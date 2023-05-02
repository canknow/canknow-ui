<template>
  <div v-transfer-dom :data-transfer="transfer">
    <transition :name="transitionNames[1]">
      <div :class="maskClasses" v-show="visible" @click="mask"></div>
    </transition>
    <div :class="wrapClasses" @click="handleWrapClick">
      <transition :name="transitionNames[0]">
        <div :class="classes" :style="mainStyles" v-show="visible">
          <c-button scene="light" type="icon" icon="cross" border circle class="c-popup-alert-close-button" @click="close"></c-button>
          <div class="c-popup-box">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import TransferDom from 'canknow-ui-core/src/directives/transfer-dom';
import Locale from '../../../mixins/locale';
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  name: 'CPopup',
  mixins: [ Locale, Emitter ],
  directives: { TransferDom },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 520
    },
    styles: {
      type: Object
    },
    className: {
      type: String
    },
    transitionNames: {
      type: Array,
      default () {
        return ['ease', 'fade'];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      wrapShow: false,
      visible: this.value
    };
  },
  computed: {
    wrapClasses () {
      return [
        'c-popup-wrap',
        {
          ['hidden']: !this.wrapShow
        }
      ];
    },
    maskClasses () {
      return 'common-masker';
    },
    classes () {
      return [
        'c-popup',
        {
          [`${this.className}`]: !!this.className
        }];
    },
    mainStyles () {
      let style = {};

      const width = parseInt(this.width);
      const styleWidth = {
        width: width <= 100 ? `${width}%` : `${width}px`
      };
      const customStyle = this.styles ? this.styles : {};
      Object.assign(style, styleWidth, customStyle);
      return style;
    }
  },
  methods: {
    close () {
      this.visible = false;
      this.$emit('input', false);
      this.$emit('cancel');
    },
    mask () {

      if (this.maskClosable) {
        this.close();
      }
    },
    handleWrapClick (event) {
      // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
      const className = event.target.getAttribute('class');

      if (className && className.indexOf('popup-wrap') > -1) {
        this.mask();
      }
    },
    animationFinish() {
      this.$emit('hidden');
    }
  },
  mounted () {
    if (this.visible) {
      this.wrapShow = true;
    }
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.EscClose);
  },
  watch: {
    value (value) {
      this.visible = value;
    },
    visible (value) {

      if (value === false) {
        this.buttonLoading = false;
        this.timer = setTimeout(() => {
          this.wrapShow = false;
        }, 300);
      }
      else {

        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.wrapShow = true;
      }
      this.broadcast('CTable', 'visible-change', value);
      this.$emit('visible-change', value);
    }
  }
};
</script>
