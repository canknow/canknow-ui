import Dropdown from './src/Dropdown.vue';
import DropdownMenu from './src/DropdownMenu.vue';
import DropdownMenuItem from './src/DropdownMenuItem.vue';

Dropdown.install = function(Vue) {
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownMenu.name, DropdownMenu);
  Vue.component(DropdownMenuItem.name, DropdownMenuItem);
};
export default [Dropdown, DropdownMenu, DropdownMenuItem];