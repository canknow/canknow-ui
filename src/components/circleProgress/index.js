import CircleProgress from './src/CircleProgress.vue';

CircleProgress.install = function(Vue) {
  Vue.component(CircleProgress.name, CircleProgress);
};
export default CircleProgress;