import Alert from './src/Alert';

Alert.install = function(Vue) {
  Vue.component(Alert.name, Alert);
};

export default Alert;
