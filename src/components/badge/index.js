import Badge from './src/Badge';

Badge.install = function(Vue) {
  Vue.component(Badge.name, Badge);
};

export default Badge;
