<template>
  <span class="c-count-to">
    {{ displayValue }}
  </span>
</template>

<script>
export default {
  name: 'CCountTo',
  props: {
    // 开始的数值，默认从0增长到某一个数
    startValue: {
      type: [Number, String],
      default: 0
    },
    // 要滚动的目标数值，必须
    endValue: {
      type: [Number, String],
      default: 0,
      required: true
    },
    // 滚动到目标数值的动画持续时间，单位为毫秒（ms）
    duration: {
      type: [Number, String],
      default: 2000
    },
    // 设置数值后是否自动开始滚动
    autoplay: {
      type: Boolean,
      default: true
    },
    // 要显示的小数位数
    decimals: {
      type: [Number, String],
      default: 0
    },
    // 是否在即将到达目标数值的时候，使用缓慢滚动的效果
    useEasing: {
      type: Boolean,
      default: true
    },
    // 十进制分割
    decimal: {
      type: [Number, String],
      default: '.'
    },
    // 千位分隔符，类似金额的分割(￥23,321.05中的",")
    separator: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localStartValue: this.startValue,
      displayValue: this.formatNumber(this.startValue),
      printValue: null,
      paused: false, // 是否暂停
      localDuration: Number(this.duration),
      startTime: null, // 开始的时间
      timestamp: null, // 时间戳
      remaining: null, // 停留的时间
      rAF: null,
      lastTime: 0 // 上一次的时间
    };
  },
  computed: {
    countDown() {
      return this.startValue > this.endValue;
    }
  },
  watch: {
    startValue() {
      this.autoplay && this.start();
    },
    endValue() {
      this.autoplay && this.start();
    }
  },
  mounted() {
    this.autoplay && this.start();
  },
  methods: {
    easingFn(t, b, c, d) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    },
    requestAnimationFrame(callback) {
      const currTime = new Date().getTime();
      // 为了使setTimeout的尽可能的接近每秒60帧的效果
      const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
      const id = setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      this.lastTime = currTime + timeToCall;
      return id;
    },
    cancelAnimationFrame(id) {
      clearTimeout(id);
    },
    // 开始滚动数字
    start() {
      this.localStartValue = this.startValue;
      this.startTime = null;
      this.localDuration = this.duration;
      this.paused = false;
      this.rAF = this.requestAnimationFrame(this.count);
    },
    // 暂定状态，重新再开始滚动；或者滚动状态下，暂停
    reStart() {
      if (this.paused) {
        this.resume();
        this.paused = false;
      }
      else {
        this.stop();
        this.paused = true;
      }
    },
    // 暂停
    stop() {
      this.cancelAnimationFrame(this.rAF);
    },
    // 重新开始(暂停的情况下)
    resume() {
      this.startTime = null;
      this.localDuration = this.remaining;
      this.localStartValue = this.printValue;
      this.requestAnimationFrame(this.count);
    },
    // 重置
    reset() {
      this.startTime = null;
      this.cancelAnimationFrame(this.rAF);
      this.displayValue = this.formatNumber(this.startValue);
    },
    count(timestamp) {
      if (!this.startTime) this.startTime = timestamp;
      this.timestamp = timestamp;
      const progress = timestamp - this.startTime;
      this.remaining = this.localDuration - progress;

      if (this.useEasing) {
        if (this.countDown) {
          this.printValue = this.localStartValue - this.easingFn(progress, 0, this.localStartValue - this.endValue, this.localDuration);
        }
        else {
          this.printValue = this.easingFn(progress, this.localStartValue, this.endValue - this.localStartValue, this.localDuration);
        }
      }
      else {
        if (this.countDown) {
          this.printValue = this.localStartValue - (this.localStartValue - this.endValue) * (progress / this.localDuration);
        }
        else {
          this.printValue = this.localStartValue + (this.endValue - this.localStartValue) * (progress / this.localDuration);
        }
      }
      if (this.countDown) {
        this.printValue = this.printValue < this.endValue ? this.endValue : this.printValue;
      }
      else {
        this.printValue = this.printValue > this.endValue ? this.endValue : this.printValue;
      }
      this.displayValue = this.formatNumber(this.printValue);

      if (progress < this.localDuration) {
        this.rAF = this.requestAnimationFrame(this.count);
      }
      else {
        this.$emit('end');
      }
    },
    // 判断是否数字
    isNumber(val) {
      return !isNaN(parseFloat(val));
    },
    formatNumber(num) {
      // 将num转为Number类型，因为其值可能为字符串数值，调用toFixed会报错
      num = Number(num);
      num = num.toFixed(Number(this.decimals));
      num += '';
      const x = num.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? this.decimal + x[1] : '';
      const rgx = /(\d+)(\d{3})/;

      if (this.separator && !this.isNumber(this.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + this.separator + '$2');
        }
      }
      return x1 + x2;
    },
    destroyed() {
      this.cancelAnimationFrame(this.rAF);
    }
  }
};
</script>
