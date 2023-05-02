<template>
  <div class="c-count-down">
    <span v-if="showDays && (hideZeroDay || (!hideZeroDay && d !== '00'))">{{ d }}</span>
    <span v-if="showDays && (hideZeroDay || (!hideZeroDay && d !== '00'))">天</span>
    <span class="c-count-down-item" :style="itemStyle" v-if="showHours">
      <span class="c-count-down-time" :style="{ color: color}">{{ h }}</span>
    </span>
    <span class="c-count-down-colon" :style="{ color: separatorColor}" v-if="showHours">
      {{ separator === 'colon' ? ':' : '时' }}
    </span>
    <span class="c-count-down-item" :style="itemStyle" v-if="showMinutes">
      <span class="c-count-down-time" :style="{ color: color}">{{ i }}</span>
    </span>
    <span class="c-count-down-colon" :style="{ color: separatorColor}" v-if="showMinutes">
      {{ separator === 'colon' ? ':' : '分' }}
    </span>
    <span class="c-count-down-item" :style="itemStyle" v-if="showSeconds">
      <span class="c-count-down-time" :style="{ color: color}">{{ s }}</span>
    </span>
    <span class="c-count-down-colon" :style="{color: separatorColor}" v-if="showSeconds && separator === 'zh'">秒</span>
  </div>
</template>

<script>
export default {
  name: 'CCountDown',
  props: {
    // 倒计时的时间，秒为单位
    timestamp: {
      type: [Number, String],
      default: 0
    },
    // 是否自动开始倒计时
    autoplay: {
      type: Boolean,
      default: true
    },
    // 用英文冒号(colon)或者中文(zh)当做分隔符，false的时候为中文，如："11:22"或"11时22秒"
    separator: {
      type: String,
      default: 'colon'
    },
    // 分隔符颜色
    separatorColor: {
      type: String,
      default: '#333333'
    },
    // 字体颜色
    color: {
      type: String,
      default: '#333333'
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    // 是否显示数字框
    showBorder: {
      type: Boolean,
      default: false
    },
    // 边框颜色
    borderColor: {
      type: String,
      default: '#333333'
    },
    // 是否显示秒
    showSeconds: {
      type: Boolean,
      default: true
    },
    // 是否显示分钟
    showMinutes: {
      type: Boolean,
      default: true
    },
    // 是否显示小时
    showHours: {
      type: Boolean,
      default: true
    },
    // 是否显示“天”
    showDays: {
      type: Boolean,
      default: true
    },
    // 当"天"的部分为0时，不显示
    hideZeroDay: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 监听时间戳的变化
    timestamp(newVal, oldVal) {
      // 如果倒计时间发生变化，清除定时器，重新开始倒计时
      this.clearTimer();
      this.start();
    }
  },
  data() {
    return {
      d: '00', // 天的默认值
      h: '00', // 小时的默认值
      i: '00', // 分钟的默认值
      s: '00', // 秒的默认值
      timer: null, // 定时器
      seconds: 0, // 记录不停倒计过程中变化的秒数
    };
  },
  computed: {
    // 倒计时item的样式，item为分别的时分秒部分的数字
    itemStyle() {
      let style = {};

      if(this.showBorder) {
        style.borderStyle = 'solid';
        style.borderColor = this.borderColor;
        style.borderWidth = '1px';
      }
      if(this.backgroundColor) {
        style.backgroundColor = this.backgroundColor;
      }
      return style;
    },
    // 倒计时数字的样式
    letterStyle() {
      let style = {};

      if(this.color) {
        style.color = this.color;
      }
      return style;
    }
  },
  mounted() {
    // 如果自动倒计时
    this.autoplay && this.timestamp && this.start();
  },
  methods: {
    // 倒计时
    start() {
      // 避免可能出现的倒计时重叠情况
      this.clearTimer();
      if (this.timestamp <= 0) return;
      this.seconds = Number(this.timestamp);
      this.formatTime(this.seconds);
      this.timer = setInterval(() => {
        this.seconds--;
        // 发出change事件
        this.$emit('change', this.seconds);
        if (this.seconds < 0) {
          return this.end();
        }
        this.formatTime(this.seconds);
      }, 1000);
    },
    // 格式化时间
    formatTime(seconds) {
      // 小于等于0的话，结束倒计时
      seconds <= 0 && this.end();
      let [day, hour, minute, second] = [0, 0, 0, 0];
      day = Math.floor(seconds / (60 * 60 * 24));
      // 判断是否显示“天”参数，如果不显示，将天部分的值，加入到小时中
      // hour为给后面计算秒和分等用的(基于显示天的前提下计算)
      hour = Math.floor(seconds / (60 * 60)) - day * 24;
      // showHour为需要显示的小时
      let showHour = null;

      if(this.showDays) {
        showHour = hour;
      }
      else {
        // 如果不显示天数，将“天”部分的时间折算到小时中去
        showHour = Math.floor(seconds / (60 * 60));
      }
      minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60;
      second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
      // 如果小于10，在前面补上一个"0"
      showHour = showHour < 10 ? '0' + showHour : showHour;
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      day = day < 10 ? '0' + day : day;
      this.d = day;
      this.h = showHour;
      this.i = minute;
      this.s = second;
    },
    // 停止倒计时
    end() {
      this.clearTimer();
      this.$emit('end', {});
    },
    reset() {
      this.clearTimer();
      this.seconds = Number(this.timestamp);

      this.s = this.timestamp;
    },
    // 清除定时器
    clearTimer() {
      if(this.timer) {
        // 清除定时器
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
