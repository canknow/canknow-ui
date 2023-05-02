import MessageAlert from './src/MessageAlert';

MessageAlert.install = function(Vue) {
  Vue.component(MessageAlert.name, MessageAlert);
};

export default MessageAlert;
