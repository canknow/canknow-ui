import LoadingBar from './src/index';

LoadingBar.install = function(Vue) {
  Vue.component(LoadingBar.name, LoadingBar);
  Vue.prototype.$LoadingBar = LoadingBar;
};
export default LoadingBar;