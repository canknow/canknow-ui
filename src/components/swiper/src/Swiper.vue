<template>
    <div class="c-swiper">
        <slot name="parallax-bg"></slot>
        <div :class="classes.wrapperClass">
            <slot></slot>
        </div>
        <div class="c-swiper-indicators" v-show="indicator"></div>
        <c-button class="c-swiper-button swiper-button-prev" type="icon" icon="prev" v-show="navigation"></c-button>
        <c-button class="c-swiper-button swiper-button-next" type="icon" icon="next" v-show="navigation"></c-button>
    </div>
</template>
<script>
import Swiper from 'swiper';

const DEFAULT_EVENTS = [
  'beforeDestroy',
  'slideChange',
  'slideChangeTransitionStart',
  'slideChangeTransitionEnd',
  'slideNextTransitionStart',
  'slideNextTransitionEnd',
  'slidePrevTransitionStart',
  'slidePrevTransitionEnd',
  'transitionStart',
  'transitionEnd',
  'touchStart',
  'touchMove',
  'touchMoveOpposite',
  'sliderMove',
  'touchEnd',
  'click',
  'tap',
  'doubleTap',
  'imagesReady',
  'progress',
  'reachBeginning',
  'reachEnd',
  'fromEdge',
  'setTranslate',
  'setTransition',
  'resize'
];

export default {
  name: 'CSwiper',
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    loop: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 3000
    },
    navigation: {
      type: Boolean,
      default: true
    },
    indicator: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      swiper: null,
      classes: {
        wrapperClass: 'c-swiper-wrapper',
        // 如果需要分页器
        pagination: '.c-swiper-pagination',
        // 如果需要前进后退按钮
        nextButton: '.c-swiper-button-next',
        prevButton: '.c-swiper-button-prev',
        // 如果需要滚动条
        scrollbar: '.c-swiper-scrollbar'
      }
    };
  },
  ready() {
    if (!this.swiper) {
      this.mountInstance();
    }
  },
  mounted() {
    if (!this.swiper) {
      let setClassName = false;

      for(const className in this.classes) {

        if (this.classes.hasOwnProperty(className)) {

          if (this.options[className]) {
            setClassName = true;
            this.classes[className] = this.options[className];
          }
        }
      }
      setClassName ? this.$nextTick(this.mountInstance) : this.mountInstance();
    }
  },
  activated() {
    this.update();
  },
  updated() {
    this.update();
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy && this.swiper.destroy();
      delete this.swiper;
    }
  },
  methods: {
    update() {
      if (this.swiper) {
        this.swiper.update && this.swiper.update();
        this.swiper.navigation && this.swiper.navigation.update();
        this.swiper.pagination && this.swiper.pagination.render();
        this.swiper.pagination && this.swiper.pagination.update();
      }
    },
    mountInstance() {
      const swiperOptions = Object.assign({
        loop: this.loop,
        speed: this.speed,
        direction: this.direction,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper,
        pagination: {
          el: '.c-swiper-indicators',
        },
        navigation: {
          nextEl: '.c-swiper-button-next',
          prevEl: '.c-swiper-button-prev',
        },
      }, this.options);
      this.swiper = new Swiper(this.$el, swiperOptions);
      this.bindEvents();
      this.$emit('ready', this.swiper);
    },
    bindEvents() {
      const vm = this;

      DEFAULT_EVENTS.forEach(eventName => {
        this.swiper.on(eventName, function() {
          vm.$emit(eventName, ...arguments);
          vm.$emit(eventName.replace(/([A-Z])/g, '-$1').toLowerCase(), ...arguments);
        });
      });
    }
  }
};
</script>
