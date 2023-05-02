import Swiper from './src/Swiper.vue';
import SwiperItem from './src/SwiperItem.vue';

Swiper.install = function(Vue) {
  Vue.component(Swiper.name, Swiper);
  Vue.component(SwiperItem.name, SwiperItem);
};
export default [Swiper, SwiperItem];