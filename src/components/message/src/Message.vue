<template>
    <transition :name="transitionName" @after-leave="handleAfterLeave">
        <div class="c-message"
             :class="classes"
             v-show="visible"
             :style="positionStyle"
             @mouseenter="clearTimer"
             @mouseleave="startTimer">
            <div class="c-message-body">
                <icon v-if="iconType" :name="iconType" class="c-message-icon" :class="{'load-loop': type === 'loading'}"></icon>
                <div class="c-message-content" v-html="content"></div>
            </div>
            <icon v-if="closable" class="c-message-close-button" name="close" @click.native="close"></icon>
        </div>
    </transition>
</template>

<script>
import iconTypes from './../../../common/sceneIconTypes';

export default {
  name: 'CMessage',
  data () {
    return {
      visible: false,
      withDesc: false,
      duration: 3000,
      type: 'info',
      invasive: true,
      content: '',
      closable: false,
      closed: false,
      className: '',
      name: null,
      onClose: null,
      verticalOffset: 20,
      transitionName: 'message-fade',
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    };
  },
  computed: {
    positionStyle() {
      return {
        'top': `${ this.verticalOffset }px`
      };
    },
    iconType () {
      return iconTypes[this.type];
    },
    classes () {
      return [
        this.className,
        this.type,
        {
          'un-invasive': !this.invasive,
          ['closable']: this.closable,
          ['with-desc']: this.withDesc
        }
      ];
    },
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  methods: {
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    }
  },
  mounted() {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  }
};
</script>

