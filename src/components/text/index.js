import Text from './src/Text';

/* istanbul ignore next */
Text.install = function(Vue) {
  Vue.component(Text.name, Text);
  Vue.component('i' + Text.name, Text);
};

export default Text;
