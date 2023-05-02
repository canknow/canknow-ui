<template>
    <div :class="slideClass">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'CSwiperItem',
  data() {
    return {
      slideClass: 'c-swiper-slide'
    };
  },
  ready() {
    this.update();
  },
  mounted() {
    this.update();
  },
  updated() {
    this.update();
  },
  attached() {
    this.update();
  },
  methods: {
    update() {
      if (this.$parent && this.$parent.swiper) {
        this.$parent.update();
      }
    }
  }
};
</script>
