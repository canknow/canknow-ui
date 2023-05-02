<template>
  <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
    <c-button border type="icon" @click="handleClick" icon="picture"></c-button>
    <c-modal append-to-body @close="handleCancel" :visible.sync="isDialogVisible" :title="t('core.richEditor.toolbar.picture.modal.title')">
      <c-tabs v-model="activeName" v-if="isDialogVisible">
        <c-tab-pane name="pictureUploader" :label="t('core.richEditor.toolbar.picture.pictureUploader')">
          <div class="content-padding text-center">
            <c-uploader :action="editor.configs.upload.action"
                        type="image"
                        multiple
                        v-model="uploadedPictures"
                        :clearable="true"
                        :headers="editor.configs.upload.headers"
                        :resultParse="editor.configs.upload.resultParse"
                        :withCredentials="editor.configs.upload.withCredentials"
                        :baseUrl="editor.configs.upload.baseUrl"
                        :onSuccess="editor.configs.upload.onSuccess">
            </c-uploader>
          </div>
        </c-tab-pane>
        <c-tab-pane name="netPicture" :label="t('core.richEditor.toolbar.picture.netPicture')">
          <div class="content-padding">
            <c-input block type="url" v-model="netPicture"></c-input>
            <div class="net-picture-wrapper">
              <img :src="netPicture" v-if="netPicture">
            </div>
          </div>
        </c-tab-pane>
      </c-tabs>
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
  name: 'Picture',
  mixins: [ Locale ],
  props: {
    editor: {
      type: Object
    }
  },
  data () {
    return {
      uploadedPictures: [],
      netPicture: null,
      activeName: 'pictureUploader',
      isDialogVisible: false,
      active: false
    };
  },
  computed: {
    disabledInsert () {
      if (this.activeName === 'pictureUploader' && !this.uploadedPictures.length)  {
        return true;
      }
      else if (this.activeName === 'netPicture' && !this.netPicture) {
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

      if (this.activeName === 'pictureUploader') {
        this.uploadedPictures.forEach(uploadedPicture => {
          let url = uploadedPicture;

          if (!uploadedPicture.includes('//')) {
            url = editor.upload.configs.baseUrl + uploadedPicture;
          }
          editor.command.do('insertHTML', `<img src="${url}"/>`);
          this.uploadedPictures = [];
        });
      }
      else {
        editor.command.do('insertHTML', `<img src="${this.netPicture}"/>`);
        this.netPicture =null;
      }
      this.isDialogVisible = false;
    },
    handleClick () {
      this.isDialogVisible = true;
    },
    // 试图改变 active 状态
    tryChangeActive (e) {
      const editor = this.editor;
      this.active = !!editor.selectedImage;
    }
  }
};
</script>
