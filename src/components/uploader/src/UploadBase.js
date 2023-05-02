import ajax from './ajax';
import { oneOf } from 'canknow-ui-core/src/utils/assist';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import Locale from '../../../mixins/locale';

export default {
  mixins: [ Locale, Emitter ],
  inject: ['uploader'],
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
    clearable: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object
    },
    multiple: {
      type: Boolean,
      default: false
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
    width: {
      type: Number,
      default: 96
    },
    height: {
      type: Number,
      default: 96
    },
    defaultFileList: {
      type: Array,
      default() {
        return [];
      }
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
      type: Function,
      default: ajax
    },
    onStart: Function,
    autoUpload: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      mouseover: false,
      requests: {}
    };
  },
  computed: {
    files() {
      return this.uploader.uploadFiles;
    },
  },
  methods: {
    handleRemove (file) {
      this.onRemove(file);
    },
    abort (file) {
      const { requests } = this;
      if (file) {
        let uid = file;
        if (file.uid) uid = file.uid;
        if (requests[uid]) {
          requests[uid].abort();
        }
      }
      else {
        Object.keys(requests).forEach((uid) => {
          if (requests[uid]) requests[uid].abort();
          delete requests[uid];
        });
      }
    },
    handleClick () {
      this.triggerSelect && this.selectFile();
    },
    selectFile() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleChange (e) {
      const files = e.target.files;

      if (!files) {
        return;
      }
      this.uploadFiles(files);
    },
    uploadFiles(files) {
      if (this.maxSize && this.fileList.length + files.length > this.maxSize) {
        this.onExceededSize && this.onExceededSize(files, this.fileList);
        return;
      }

      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
        this.$refs.input.value = null;
      }

      if (postFiles.length === 0) {
        return;
      }

      postFiles.forEach(rawFile => {
        this.onStart(rawFile);

        if (this.autoUpload) {
          this.upload(rawFile);
        }
      });
    },
    onDrop (e) {
      this.dragOver = false;
      this.upload(e.dataTransfer.files[0]);
    },
    upload (rawFile) {

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }
      const before = this.beforeUpload(rawFile);

      if (before && before.then) {
        before.then(processedFile => {
          const fileType = Object.prototype.toString.call(processedFile);

          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if (fileType === '[object Blob]') {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }
            for (const p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            this.post(processedFile);
          }
          else {
            this.post(rawFile);
          }
        }, () => {
          this.onRemove(null, rawFile);
        });
      }
      else if (before !== false) {
        this.post(rawFile);
      }
      else {
        this.onRemove(null, rawFile);
      }
    },
    handleKeydown(e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    },
    post (rawFile) {
      const { uid } = rawFile;
      let request;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.requests[uid];
        },
        onError: (err, response) => {
          this.onError(err, rawFile);
          delete this.requests[uid];
        }
      };
      request = ajax(options);
      this.requests[uid] = request;

      if (request && request.then) {
        request.then(options.onSuccess, options.onError);
      }
    }
  }
};
