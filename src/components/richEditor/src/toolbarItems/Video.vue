<template>
  <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
    <c-button border type="icon" @click="handleClick" icon="video"></c-button>
    <c-modal append-to-body @close="handleCancel" :visible.sync="isDialogVisible" :title="t('core.richEditor.toolbar.video.modal.title')">
      <div class="content-padding">
        <div class="margin-bottom-1">
          <c-input block type="url" v-model="videoHtml"></c-input>
        </div>
        <p>{{t('core.richEditor.toolbar.video.help')}}：&#60;iframe src=... &#62;&#60;/iframe&#62;</p>
      </div>
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
  name: 'Video',
  mixins: [ Locale ],
  props: {
    editor: {
      type: Object
    }
  },
  data () {
    return {
      videoHtml: null,
      isDialogVisible: false,
      active: false
    };
  },
  computed: {
    disabledInsert () {
      if (!this.videoHtml)  {
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
      editor.command.do('insertHTML', `${this.videoHtml}<p><br></p>`);
      this.videoHtml =null;
      this.isDialogVisible = false;
    },
    handleClick () {
      this.isDialogVisible = true;
    }
  }
};
</script>

