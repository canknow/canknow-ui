import Row from './src/Row';
import Column from './src/Column';

Row.install = function(Vue) {
  Vue.component(Row.name, Row);
  Vue.component(Column.name, Column);
};
export default [Row, Column];