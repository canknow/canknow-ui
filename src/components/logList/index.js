import LogList from './src/LogList';
import LogItem from './src/LogItem';

LogList.install = function(Vue) {
  Vue.component(LogList.name, LogList);
  Vue.component(LogItem.name, LogItem);
};

export default LogList;
