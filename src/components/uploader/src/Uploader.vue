<template>
    <Component :is="componentName"
               :value="value"
               ref="uploader"
               @input="handleInput"
               :action="action"
               :baseUrl="baseUrl"
               :defaultPicture="defaultPicture"
               :type="type"
               :headers="headers"
               :clearable="clearable"
               :withCredentials="withCredentials"
               :showUploadList="showUploadList"
               :isShowProgress="isShowProgress"
               :format="format"
               :resultParse="resultParse"
               :height="height"
               :accept="accept"
               :onStart="handleStart"
               :onProgress="handleProgress"
               :onSuccess="handleSuccess"
               :onError="handleError"
               :beforeUpload="beforeUpload"
               :onRemove="handleRemove"
               :onPreview="onPreview"
               :maxSize="maxSize"
               :multiple="multiple"
               :onExceededSize="onExceededSize"
               :onFormatError="onFormatError"
               :radius="radius"
               :drag="drag"
               :block="block"
               :name="name"
               :autoUpload="autoUpload"
               :triggerSelect="triggerSelect"
               :uploadHandle="uploadHandle"
               :data="data">
        <slot></slot>
    </Component>
</template>

<script>
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import Locale from '../../../mixins/locale';
import { oneOf } from 'canknow-ui-core/src/utils/assist';
import SingleUploader from './SingleUploader';
import MultipleUploader from './MultipleUploader';
import { noop } from 'canknow-core/src/libs';
import log from '../../../utils/log';

export default {
  name: 'CUploader',
  mixins: [ Locale, Emitter ],
  provide() {
    return {
      uploader: this
    };
  },
  inject: {
    form: {
      default: ''
    }
  },
  components: {
    SingleUploader,
    MultipleUploader
  },
  props: {
    action: {
      type: String,
    },
    baseUrl: {
      type: String
    },
    defaultPicture: {
      type: String
    },
    type: {
      type: String,
      default: 'file',
      validator (value) {
        return oneOf(value, ['file', 'image']);
      },
    },
    headers: {
      type: Object,
      default () {
        return {};
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object
    },
    value: {
      type: [String, Array]
    },
    name: {
      type: String,
      default: 'file'
    },
    block: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    isShowProgress: {
      type: Boolean,
      default: true
    },
    format: {
      type: Array,
      default () {
        return [];
      }
    },
    accept: {
      type: String
    },
    maxSize: {
      type: Number
    },
    beforeUpload: Function,
    onProgress: {
      type: Function,
      default () {
        return {};
      }
    },
    onSuccess: {
      type: Function,
      default () {
        return {};
      }
    },
    onError: {
      type: Function,
      default () {
        return {};
      }
    },
    onRemove: {
      type: Function,
      default () {
        return {};
      }
    },
    onPreview: {
      type: Function
    },
    onExceededSize: {
      type: Function,
      default () {
        return {};
      }
    },
    onFormatError: {
      type: Function,
      default () {
        return {};
      }
    },
    height: {
      type: Number,
      default: 96
    },
    resultParse: {
      type: Function,
      default (response) {
        return response.result.path;
      }
    },
    radius: Boolean,
    triggerSelect: {
      type: Boolean,
      default: true,
    },
    uploadHandle: {
      type: Function
    },
    beforeRemove: Function,
    onChange: {
      type: Function,
      default: noop
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    componentName() {
      return this.multiple ? 'MultipleUploader' : 'SingleUploader';
    }
  },
  data () {
    return {
      uploadFiles: [],
      tempIndex: 1
    };
  },
  watch: {
    value() {
      this.createUploadFiles();
    }
  },
  created () {
    this.createUploadFiles();
  },
  methods: {
    createUploadFiles() {
      if (!this.value) {
        this.uploadFiles = [];
      }
      else {
        if (this.multiple) {
          const uploadFiles = [];

          this.uploadFiles.forEach(uploadFile => {
            if (uploadFile.raw) {
              uploadFiles.push(uploadFile);
            }
          });

          this.value.forEach((filePath, index) => {
            let uploadFile = uploadFiles.find(_ => _.filePath === filePath);

            if (!uploadFile) {
              const filePaths = filePath.split('/');
              const fileName = filePaths[filePaths.length - 1];

              uploadFile = {};
              uploadFile.filePath = filePath;
              uploadFile.status = 'success';
              uploadFile.name = fileName;
              uploadFile.uid = Date.now() + this.tempIndex++;
              uploadFile.percentage = 100;

              uploadFiles.push(uploadFile);
            }
          });
          this.uploadFiles = uploadFiles;
        }
        else {
          const filePaths = this.value.split('/');
          const fileName = filePaths[filePaths.length - 1];

          const uploadFile = {};
          uploadFile.filePath = this.value;
          uploadFile.name = fileName;
          uploadFile.status = 'success';
          uploadFile.uid = Date.now() + this.tempIndex++;
          uploadFile.percentage = 100;
          this.uploadFiles = [uploadFile];
        }
      }
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles;
      let target;
      fileList.every(item => {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    handleProgress(e, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(e, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = e.percent || 0;
    },
    handleStart (rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      const file = {
        status: 'ready',
        name: rawFile.name,
        filePath: null,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };
      if (this.type === 'image') {
        try {
          file.url = URL.createObjectURL(rawFile);
        }
        catch (err) {
          log.error('[Upload]', err);
          return;
        }
      }
      if (this.multiple) {
        this.uploadFiles.push(file);
      }
      else {
        this.uploadFiles = [file];
      }
      this.onChange(file, this.uploadFiles);
    },
    handleSuccess(response, rawFile) {
      const file = this.getFile(rawFile);

      if (file) {
        file.filePath = this.resultParse(response, file);
        file.status = 'success';
        file.response = response;

        this.onSuccess(response, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      }
      this.emitByFile(file);
    },
    handleError(error, rawFile) {
      const file = this.getFile(rawFile);
      const fileList = this.uploadFiles;

      file.status = 'fail';

      fileList.splice(fileList.indexOf(file), 1);

      this.onError(error, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    emitByFile(file) {
      if (!this.multiple) {
        this.$emit('input', file?.filePath);
        this.dispatch('CFormItem', 'form.change', file);
      }
      else {
        const value = this.uploadFiles.filter(uploadFile => !!uploadFile.filePath).map(uploadFile => uploadFile.filePath);
        this.$emit('input', value);
        this.dispatch('CFormItem', 'form.change', value);
      }
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw);
      }
      let doRemove = () => {
        this.abort(file);
        let fileList = this.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
        this.emitByFile(null);
      };

      if (!this.beforeRemove) {
        doRemove();
      }
      else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles);

        if (before && before.then) {
          before.then(() => {
            doRemove();
          }, noop);
        }
        else if (before !== false) {
          doRemove();
        }
      }
    },
    abort(file) {
      this.$refs.uploader.abort(file);
    },
    selectFile() {
      this.$refs.uploader.selectFile();
    },
    clearFiles() {
      this.uploadFiles = [];
    },
    submit() {
      this.uploadFiles.filter(file => file.status === 'ready').forEach(file => {
        this.$refs.uploader.upload(file.raw);
      });
    },
    handleInput(value) {
      this.$emit('input', value);
    }
  },
  beforeDestroy() {
    this.uploadFiles.forEach(file => {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url);
      }
    });
  },
};
</script>
