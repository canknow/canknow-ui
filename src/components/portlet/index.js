import Portlet from './src/Portlet.vue';

Portlet.install = function(Vue) {
  Vue.component(Portlet.name, Portlet);
};
export default Portlet;