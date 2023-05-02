<template>
  <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
    <c-button border type="icon" @click="handleClick" icon="link"></c-button>
    <c-modal append-to-body @close="handleCancel" :visible.sync="isDialogVisible" :title="t('core.richEditor.toolbar.link.modal.title')">
      <c-form>
        <c-form-item>
          <c-input block name="url" type="url" v-model="url" :placeholder="t('core.richEditor.toolbar.link.urlPlaceholder')"></c-input>
        </c-form-item>
        <c-form-item>
          <c-input block value="text" type="text" v-model="text" :placeholder="t('core.richEditor.toolbar.link.textPlaceholder')"></c-input>
        </c-form-item>
      </c-form>
      <div slot="footer">
        <c-button size="large" @click="handleCancel">{{t('core.modal.cancelText')}}</c-button>
        <c-button size="large" :disabled="disabledInsert" scene="primary" @click="insert">{{t('core.modal.okText')}}</c-button>
      </div>
    </c-modal>
  </div>
</template>

<script>
import Locale from '../../../../mixins/locale';

export default {
  name: 'Link',
  mixins: [ Locale ],
  props: {
    editor: {
      type: Object
    }
  },
  data () {
    return {
      url: null,
      text: null,
      isDialogVisible: false,
      active: false
    };
  },
  computed: {
    disabledInsert () {
      if (!this.url || !this.text)  {
        return true;
      }
      return false;
    }
  },
  methods: {
    handleCancel () {
      this.isDialogVisible = false;
    },
    insert () {
      const editor = this.editor;
      this.editor.selection.restoreSelection();
      const range = editor.selection.getRange();

      if (range.startOffset !== range.endOffset) {
        const a = document.createElement('a');
        a.href = this.url;
        a.innerText = this.text;
        editor.selection.getRange().surroundContents(a);
        editor.change && editor.change();
      }
      else {
        editor.command.do('insertHTML', `<a href="${this.url}">${this.text}</a>`);
      }
      this.videoHtml =null;
      this.isDialogVisible = false;
    },
    handleClick () {
      this.editor.selection.saveRange();
      this.isDialogVisible = true;
    }
  }
};
</script>


