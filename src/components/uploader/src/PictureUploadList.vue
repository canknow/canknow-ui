<template>
    <div class="c-picture-uploader-list">
        <div v-for="(file, index) in files"
            :key="index"
            class="c-picture-uploader-list-item"
            :class="fileClass(file)"
            @click="handleClick(file)">

            <div class="c-picture-uploader-picture-box">
                <img class="c-picture-uploader-picture-box-img" :width="width" :height="height" :src="getFilePath(file)"/>
                <transition name="fade">
                    <c-progress v-if="file.status === 'uploading'"
                                :stroke-width="2"
                                type="line"
                                :show-text="false"
                                :percentage="parsePercentage(file.percentage)"
                                :status="file.status === 'success' ? 'success' : null"></c-progress>
                </transition>
                <div class="c-picture-uploader-picture-box-actions">
                    <div class="c-picture-uploader-picture-box-action margin-right-1"
                         v-if="handlePreview"
                         @click="handlePreview(file)">
                        <icon name="zoom-in"></icon>
                    </div>
                    <div class="c-picture-uploader-picture-box-action"
                         v-show="file.status === 'success'"
                         @click="handleRemove(file)">
                        <icon name="remove"></icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="c-picture-uploader-list-item">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CPictureUploadList',
  props: {
    baseUrl: {
      type: String
    },
    defaultPicture: {
      type: String
    },
    width: {
      type: Number,
      default: 96
    },
    height: {
      type: Number,
      default: 96
    },
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    handlePreview: Function,
  },
  data () {
    return {
    };
  },
  methods: {
    getFilePath (file) {
      if (file.status !== 'success') {
        return file.url;
      }
      if (file.filePath.includes('//')) {
        return file.filePath;
      }
      return this.baseUrl + file.filePath;
    },
    fileClass (file) {
      return [
        {
          ['picture-uploader-item-finish']: file.status === 'finished'
        }
      ];
    },
    handleClick (file) {
      this.$emit('file-click', file);
    },
    handleRemove (file) {
      this.$emit('file-remove', file);
    },
    parsePercentage (value) {
      return parseInt(value, 10);
    }
  }
};
</script>
