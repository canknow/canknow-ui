<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-button border type="icon" @click="handleClick" icon="align-left"></c-button>
    </div>
</template>

<script>
export default {
  name: 'JustifyLeft',
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
      editor.command.do('justifyLeft');
    },
    tryChangeActive (e) {
      const editor = this.editor;
      if (editor.command.queryCommandState('justifyLeft')) {
        this.active = true;
      }
      else {
        this.active = false;
      }
    }
  }
};
</script>

