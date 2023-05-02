import Switch from './src/Switch.vue';

Switch.install = function(Vue) {
  Vue.component(Switch.name, Switch);
  Vue.component('iSwitch', Switch);
};
export default Switch;