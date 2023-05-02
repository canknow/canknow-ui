import DetailedList from './src/DetailedList.vue';
import DetailedItem from './src/DetailedItem.vue';

DetailedList.install = function(Vue) {
  Vue.component(DetailedList.name, DetailedList);
  Vue.component(DetailedItem.name, DetailedItem);
};
export default [DetailedList, DetailedItem];