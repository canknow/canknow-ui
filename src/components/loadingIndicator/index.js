import LoadingIndicator from './src/LoadingIndicator';

/* istanbul ignore next */
LoadingIndicator.install = function(Vue) {
  Vue.component(LoadingIndicator.name, LoadingIndicator);
};

export default LoadingIndicator;
