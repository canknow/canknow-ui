import Popup from './src/index';

Popup.install = function(Vue) {
  Vue.component(Popup.name, Popup);
  Vue.prototype.$Popup = Popup;
};
export default Popup;