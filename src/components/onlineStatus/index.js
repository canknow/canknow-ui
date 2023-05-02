import OnlineStatus from './src/OnlineStatus';

OnlineStatus.install = function(Vue) {
  Vue.component(OnlineStatus.name, OnlineStatus);
};
export default OnlineStatus;