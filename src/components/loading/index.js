import Loading from './src/index';

Loading.install = function(Vue) {
  Vue.component(Loading.name, Loading);
  Vue.prototype.$Loading = Loading;
};
export default Loading;