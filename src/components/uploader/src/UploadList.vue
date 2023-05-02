<template>
    <ul class="c-upload-list">
        <li v-for="(file, index) in files"
            :key="index"
            class="c-upload-list-item"
            :class="fileClass(file)"
            @click="handleClick(file)">
            <div class="c-upload-list-item-wrapper">
                <label class="c-upload-list-item-file-info">
                    <icon class="c-upload-list-item-file-preview"
                          name="zoom-in"
                          v-if="file.status === 'finished' && onPreview"
                          @click="onPreview(file)"></icon>
                    <icon class="c-upload-list-item-file-icon" :name="format(file)"></icon>
                    <span class="c-upload-list-item-file-name">{{ fileName(file) }}</span>
                </label>
                <icon name="remove"
                      class="c-upload-list-item-remove component-span-left"
                      v-show="file.status === 'success'"
                      @click.native="handleRemove(file)"></icon>
            </div>
            <transition name="fade">
                <c-progress v-if="file.status === 'uploading'"
                            :stroke-width="2"
                            :percentage="parsePercentage(file.percentage)"
                            :status="file.status === 'success' ? 'success' : null"></c-progress>
            </transition>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'CUploadList',
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    onPreview: Function,
  },
  methods: {
    fileName(file) {
      return file.name;
    },
    fileClass (file) {
      return [
        'c-upload-list-file',
        {
          ['c-upload-list-file-finish']: file.status === 'finished'
        }
      ];
    },
    handleClick (file) {
      this.$emit('file-click', file);
    },
    handleRemove (file) {
      this.$emit('file-remove', file);
    },
    format (file) {
      const format = file.name.split('.').pop().toLocaleLowerCase() || '';
      let type = 'document';

      if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp', 'svg'].indexOf(format) > -1) {
        type = 'picture';
      }
      else if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
        type = 'video';
      }
      else if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
        type = 'audio';
      }
      else if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(format) > -1) {
        type = 'document';
      }
      else if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
        type = 'excel';
      }
      else if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
        type = 'ppt';
      }
      else {
        type = 'file';
      }
      return type;
    },
    parsePercentage (value) {
      return parseInt(value, 10);
    }
  }
};
</script>
