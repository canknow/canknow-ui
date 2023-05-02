import Example from './src/Example';

Example.install = function(Vue) {
  Vue.component(Example.name, Example);
};
export default Example;