<template>
  <div class="c-tree-node"
       @click.stop="handleClick"
       @contextmenu="($event) => this.handleContextMenu($event)"
       v-show="node.visible"
       :class="{
      'expanded': expanded,
      'current': node.isCurrent,
      'hidden': !node.visible,
      'focusable': !node.disabled,
      'checked': !node.disabled && node.checked
    }"
       role="treeitem"
       tabindex="-1"
       :aria-expanded="expanded"
       :aria-disabled="node.disabled"
       :aria-checked="node.checked"
       :draggable="tree.draggable"
       @dragstart.stop="handleDragStart"
       @dragover.stop="handleDragOver"
       @dragend.stop="handleDragEnd"
       @drop.stop="handleDrop"
       ref="node">
    <div class="c-tree-node-content" :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }">
      <span @click.stop="handleExpandIconClick"
            class="c-tree-node-expand-icon"
            :class="{ expanded: expanded, 'is-leaf': node.isLeaf }"><icon name="down-fill"></icon></span>
      <c-checkbox v-if="showCheckbox"
                  class="c-tree-node-checkbox"
                  v-model="node.checked"
                  :indeterminate="node.indeterminate"
                  :disabled="!!node.disabled"
                  @click.native.stop
                  @change="handleCheckChange"></c-checkbox>
      <Icon v-if="node.loading" name="loading" class="c-tree-node-loading-icon c-icon-loading"></Icon>
      <node-content :node="node"></node-content>
    </div>
    <collapse-transition>
      <div
          class="c-tree-node-children"
          v-if="!renderAfterExpand || childNodeRendered"
          v-show="expanded"
          role="group"
          :aria-expanded="expanded">
        <c-tree-node :render-content="renderContent"
                     v-for="child in node.childNodes"
                     :render-after-expand="renderAfterExpand"
                     :show-checkbox="showCheckbox"
                     :key="getNodeKey(child)"
                     :node="child"
                     @node-expand="handleChildNodeExpand">
        </c-tree-node>
      </div>
    </collapse-transition>
  </div>
</template>

<script type="text/jsx">
import CollapseTransition from '../../collapseTransition/src/CollapseTransition';
import emitter from 'canknow-ui-core/src/mixins/emitter';
import { getNodeKey } from './model/util';

export default {
  name: 'CTreeNode',
  componentName: 'CTreeNode',
  mixins: [emitter],
  props: {
    node: {
      default() {
        return {};
      }
    },
    props: {},
    renderContent: Function,
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CollapseTransition,
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent;
        const tree = parent.tree;
        const node = this.node;
        const { data, store } = node;
        return (
          parent.renderContent
            ? parent.renderContent.call(parent._renderProxy, h, { _self: tree.$vnode.context, node, data, store })
            : tree.$scopedSlots.default
              ? tree.$scopedSlots.default({ node, data })
              : <span class="c-tree-node-label">{ node.label }</span>
        );
      }
    }
  },
  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null
    };
  },
  watch: {
    'node.indeterminate'(val) {
      this.handleSelectChange(this.node.checked, val);
    },
    'node.checked'(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },
    'node.expanded'(val) {
      this.$nextTick(() => this.expanded = val);
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },
  methods: {
    getNodeKey(node) {
      return getNodeKey(this.tree.nodeKey, node.data);
    },
    handleSelectChange(checked, indeterminate) {
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', this.node.data, checked, indeterminate);
      }
      this.oldChecked = checked;
      this.indeterminate = indeterminate;
    },
    handleClick() {
      const store = this.tree.store;
      store.setCurrentNode(this.node);
      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
      this.tree.currentNode = this;
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick();
      }
      if (this.tree.checkOnClickNode && !this.node.disabled) {
        this.handleCheckChange(null, {
          target: { checked: !this.node.checked }
        });
      }
      this.tree.$emit('node-click', this.node.data, this.node, this);
    },
    handleContextMenu(event) {
      if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this);
    },
    handleExpandIconClick() {
      if (this.node.isLeaf) return;
      if (this.expanded) {
        this.tree.$emit('node-collapse', this.node.data, this.node, this);
        this.node.collapse();
      }
      else {
        this.node.expand();
        this.$emit('node-expand', this.node.data, this.node, this);
      }
    },
    handleCheckChange(value, ev) {
      this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
      this.$nextTick(() => {
        const store = this.tree.store;
        this.tree.$emit('check', this.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys(),
        });
      });
    },
    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('CTreeNode', 'tree-node-expand', node);
      this.tree.$emit('node-expand', nodeData, node, instance);
    },
    handleDragStart(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-start', event, this);
    },
    handleDragOver(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-over', event, this);
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
    },
    handleDragEnd(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-end', event, this);
    }
  },
  created() {
    const parent = this.$parent;

    if (parent.isTree) {
      this.tree = parent;
    }
    else {
      this.tree = parent.tree;
    }

    const tree = this.tree;
    if (!tree) {
      console.warn('Can not find node\'s tree.');
    }

    const props = tree.props || {};
    const childrenKey = props['children'] || 'children';

    this.$watch(`node.data.${childrenKey}`, () => {
      this.node.updateChildren();
    });

    if (this.node.expanded) {
      this.expanded = true;
      this.childNodeRendered = true;
    }

    if(this.tree.accordion) {
      this.$on('tree-node-expand', node => {
        if(this.node !== node) {
          this.node.collapse();
        }
      });
    }
  }
};
</script>
