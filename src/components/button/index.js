import Button from './src/Button.vue';
import ButtonGroup from './src/ButtonGroup.vue';

Button.install = function(Vue) {
  Vue.component(Button.name, Button);
  Vue.component(ButtonGroup.name, ButtonGroup);
};
export default Button;
