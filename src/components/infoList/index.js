import InfoList from './src/InfoList.vue';
import InfoItem from './src/InfoItem.vue';

InfoList.install = function(Vue) {
  Vue.component(InfoList.name, InfoList);
  Vue.component(InfoItem.name, InfoItem);
};
export default [InfoList, InfoItem];