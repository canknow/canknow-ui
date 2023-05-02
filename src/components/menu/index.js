import Menu from './src/Menu.vue';
import MenuItem from './src/MenuItem.vue';
import Submenu from './src/Submenu.vue';

Menu.install = function(Vue) {
  Vue.component(Menu.name, Menu);
  Vue.component('iMenu', Menu);
  Vue.component(MenuItem.name, MenuItem);
  Vue.component(Submenu.name, Submenu);
};
export default [Menu, MenuItem, Submenu];
