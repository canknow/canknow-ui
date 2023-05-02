import Tag from './src/Tag.vue';

Tag.install = function(Vue) {
  Vue.component(Tag.name, Tag);
};
export default Tag;