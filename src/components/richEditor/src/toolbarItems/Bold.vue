<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-button type="icon" icon="bold" border @click="handleClick"></c-button>
    </div>
</template>

<script>
export default {
  name: 'Bold',
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
      const isSelectionEmpty = editor.selection.isSelectionEmpty();
      if (isSelectionEmpty) {
        // 选区是空的，插入并选中一个“空白”
        editor.selection.createEmptyRange();
      }
      editor.command.do('bold');

      if (isSelectionEmpty) {
        // 需要将选取折叠起来
        editor.selection.collapseRange();
        editor.selection.restoreSelection();
      }
    },
    tryChangeActive (e) {
      const editor = this.editor;
      if (editor.command.queryCommandState('bold')) {
        this.active = true;
      }
      else {
        this.active = false;
      }
    }
  }
};
</script>

