<template>
    <div ref="toolbar" class="c-rich-editor-toolbar">
        <component :editor="editor" :is="key" v-for="(key, index) in toolbarItems" :key="index"></component>
    </div>
</template>
<script>
import toolbarItems from './toolbarItems/index';

export default {
  name: 'Toolbar',
  props: {
    editor: {
      type: Object
    }
  },
  computed: {
    toolbarItems () {
      return Object.assign({}, toolbarItems, this.editor.configs.toolbarItems);
    }
  },
  methods: {
    // 尝试修改菜单状态
    changeActive () {
      this.$children.forEach((child) => {
        if (child.tryChangeActive) {
          setTimeout(() => {
            child.tryChangeActive();
          }, 100);
        }
      });
    }
  }
};
</script>
