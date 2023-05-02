import List from './src/List';
import ListItem from './src/ListItem';
import ListItemMeta from './src/ListItemMeta';

List.install = function(Vue) {
  Vue.component(List.name, List);
  Vue.component(ListItem.name, ListItem);
  Vue.component(ListItemMeta.name, ListItemMeta);
};

export default List;
