import RichEditor from './src/RichEditor.vue';

RichEditor.install = function(Vue) {
  Vue.component(RichEditor.name, RichEditor);
};
export default RichEditor;