import Message from './src/index';

Message.install = function(Vue) {
  Vue.prototype.$Message = Message;
};
export default Message;