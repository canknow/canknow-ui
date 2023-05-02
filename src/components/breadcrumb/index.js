import Breadcrumb from './src/Breadcrumb.vue';
import BreadcrumbItem from './src/BreadcrumbItem.vue';

Breadcrumb.Item = BreadcrumbItem;

Breadcrumb.install = function(Vue) {
  Vue.component(Breadcrumb.name, Breadcrumb);
  Vue.component(BreadcrumbItem.name, BreadcrumbItem);
};
export default [Breadcrumb, BreadcrumbItem];