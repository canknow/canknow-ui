import Table from './src/Table';
import TableColumn from './src/TableColumn';

/* istanbul ignore next */
Table.install = function(Vue) {
  Vue.component(Table.name, Table);
  Vue.component('iTable', Table);
  Vue.component(TableColumn.name, TableColumn);
};

export default [Table, TableColumn];
