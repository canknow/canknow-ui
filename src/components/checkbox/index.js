import Checkbox from './src/Checkbox.vue';
import CheckboxButton from './src/CheckboxButton.vue';

Checkbox.install = function(Vue) {
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CheckboxButton.name, CheckboxButton);
};
export default Checkbox;