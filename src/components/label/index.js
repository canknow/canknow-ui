import Label from './src/Label.vue';

Label.install = function(Vue) {
  Vue.component(Label.name, Label);
  Vue.component('iLabel', Label);
};
export default Label;