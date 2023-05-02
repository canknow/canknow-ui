<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-button border type="icon" @click="handleClick" icon="list-unordered"></c-button>
    </div>
</template>

<script>
export default {
  name: 'InsertUnOrderedList',
  props: {
    editor: {
      type: Object
    }
  },
  data () {
    return {
      active: false
    };
  },
  methods: {
    handleClick (e) {
      const editor = this.editor;
      editor.selection.restoreSelection();
      if (editor.command.queryCommandState('insertUnOrderedList')) {
        return;
      }
      editor.command.do('insertUnOrderedList');

      // 验证列表是否被包裹在 <p> 之内
      let selectionElement = editor.selection.getSelectionContainerElement();
      if (selectionElement.nodeName === 'LI') {
        selectionElement = selectionElement.parentNode;
      }
      if (/^ol|ul$/i.test(selectionElement.nodeName) === false) {
        return;
      }
      if (selectionElement === this.editor.$refs.editor) {
        // 证明是顶级标签，没有被 <p> 包裹
        return;
      }
      const parent = selectionElement.parentNode;
      if (parent === this.editor.$refs.editor) {
        // parent 是顶级标签，不能删除
        return;
      }
      selectionElement.insertAfter(parent);
      parent.remove();
    },
    tryChangeActive (e) {
      const editor = this.editor;
      if (editor.command.queryCommandState('insertUnOrderedList')) {
        this.active = true;
      }
      else {
        this.active = false;
      }
    }
  }
};
</script>

