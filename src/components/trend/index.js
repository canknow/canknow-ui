import Trend from './src/Trend';

/* istanbul ignore next */
Trend.install = function(Vue) {
  Vue.component(Trend.name, Trend);
};

export default Trend;
