import Progress from './src/Progress.vue';

Progress.install = function(Vue) {
  Vue.component(Progress.name, Progress);
  Vue.component('iProgress', Progress);
};
export default Progress;