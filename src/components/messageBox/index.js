import MessageBox from './src/main.js';
MessageBox.install = function(Vue) {
  Vue.prototype.$MessageBox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
};
export default MessageBox;
