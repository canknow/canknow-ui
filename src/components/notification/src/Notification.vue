<template>
  <transition name="notification-fade">
    <div
        :class="['c-notification', type, customClass, horizontalClass]"
        v-show="visible"
        :style="positionStyle"
        @mouseenter="clearTimer()"
        @mouseleave="startTimer()"
        @click="click"
        role="alert">
      <icon v-if="iconType" :name="iconType" class="c-notification-icon"></icon>
      <div class="c-notification-group" :class="{ 'is-with-icon': iconType }">
        <div class="c-notification-header">
          <div class="c-notification-title" v-text="title"></div>
        </div>
        <div class="c-notification-content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <c-container-close-button class="c-notification-close-button"
                                v-if="showClose"
                                :vertical-center="false"
                                @click="close"></c-container-close-button>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import iconTypes from './../../../common/sceneIconTypes';

export default {
  data() {
    return {
      visible: false,
      title: '',
      message: '',
      duration: 4500,
      type: '',
      showClose: true,
      customClass: '',
      onClose: null,
      onClick: null,
      closed: false,
      verticalOffset: 0,
      timer: null,
      dangerouslyUseHTMLString: false,
      position: 'top-right'
    };
  },

  computed: {
    iconType () {
      return iconTypes[this.type];
    },

    horizontalClass() {
      return this.position.indexOf('right') > -1 ? 'right' : 'left';
    },

    verticalProperty() {
      return /^top-/.test(this.position) ? 'top' : 'bottom';
    },

    positionStyle() {
      return {
        [this.verticalProperty]: `${ this.verticalOffset }px`
      };
    }
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },

  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    click() {
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
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
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer(); // detele 取消倒计时
      }
      else if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
      else {
        this.startTimer(); // 恢复倒计时
      }
    }
  },
  mounted() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close();
        }
      }, this.duration);
    }
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  }
};
</script>

