<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-button border type="icon" @click="handleClick" icon="align-right"></c-button>
    </div>
</template>

<script>
export default {
  name: 'JustifyRight',
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
      editor.command.do('justifyRight');
    },
    tryChangeActive (e) {
      const editor = this.editor;
      if (editor.command.queryCommandState('justifyRight')) {
        this.active = true;
      }
      else {
        this.active = false;
      }
    }
  }
};
</script>

