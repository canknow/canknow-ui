import Radio from './src/Radio.vue';

Radio.install = function(Vue) {
  Vue.component(Radio.name, Radio);
  Vue.component('iRadio', Radio);
};
export default Radio;