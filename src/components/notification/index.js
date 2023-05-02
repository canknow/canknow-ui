import Notification from './src/index';

Notification.install = function(Vue) {
  Vue.prototype.$Notification = Notification;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$Notify = Notification;
};
export default Notification;