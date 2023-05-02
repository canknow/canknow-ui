import Tree from './src/Tree';
import TreeNode from './src/TreeNode';

Tree.install = function(Vue) {
  Vue.component(Tree.name, Tree);
};
export default [Tree, TreeNode];
