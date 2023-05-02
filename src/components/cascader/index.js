import Cascader from './src/Cascader';

/* istanbul ignore next */
Cascader.install = function(Vue) {
  Vue.component(Cascader.name, Cascader);
};

export default Cascader;
