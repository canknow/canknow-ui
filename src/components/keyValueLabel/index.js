import KeyValueLabel from './src/KeyValueLabel.vue';

KeyValueLabel.install = function(Vue) {
  Vue.component(KeyValueLabel.name, KeyValueLabel);
  Vue.component('iKeyValueLabel', KeyValueLabel);
};
export default KeyValueLabel;
