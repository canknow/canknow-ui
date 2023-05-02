<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-button border type="icon" icon="italic" @click="handleClick"></c-button>
    </div>
</template>

<script>
export default {
  name: 'Italic',
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
    // 点击事件
    handleClick (e) {
      // 点击菜单将触发这里
      const editor = this.editor;
      const isSelectionEmpty = editor.selection.isSelectionEmpty();
      if (isSelectionEmpty) {
        // 选区是空的，插入并选中一个“空白”
        editor.selection.createEmptyRange();
      }
      // 执行 bold 命令
      editor.command.do('italic');

      if (isSelectionEmpty) {
        // 需要将选取折叠起来
        editor.selection.collapseRange();
        editor.selection.restoreSelection();
      }
    },
    // 试图改变 active 状态
    tryChangeActive (e) {
      const editor = this.editor;
      if (editor.command.queryCommandState('italic')) {
        this.active = true;
      }
      else {
        this.active = false;
      }
    }
  }
};
</script>

