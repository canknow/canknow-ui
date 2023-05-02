import Tabs from './src/Tabs.vue';
import TabPane from './src/TabPane.vue';

Tabs.install = function(Vue) {
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabPane.name, TabPane);
};
export default [Tabs, TabPane];