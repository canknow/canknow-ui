import NumericList from './src/NumericList';

/* istanbul ignore next */
NumericList.install = function(Vue) {
  Vue.component(NumericList.name, NumericList);
};

export default NumericList;
