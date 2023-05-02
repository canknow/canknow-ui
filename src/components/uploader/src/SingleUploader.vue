<template>
  <div class="c-uploader" :class="classes">

    <div class="c-uploader-box">

      <div class="c-picture-uploader-picture-box" v-if="type==='image'"
           :style="{ width: width + 'px', height: height + 'px'}">

        <template v-if="file">
          <c-image class="c-picture-uploader-picture-box-img" :src="filePath" :style="{width: width + 'px', height: height + 'px'}" fit="cover"/>
          <div class="c-picture-uploader-picture-box-actions">
            <div class="c-picture-uploader-picture-box-action margin-right-1"
                 v-if="onPreview"
                 @click="handlePreview(file)">
              <icon name="zoom-in"></icon>
            </div>
            <div class="c-picture-uploader-item-action"
                 v-show="clearable && file.status === 'success'"
                 @click="handleRemove(file)">
              <icon name="remove"></icon>
            </div>
          </div>
        </template>

        <div v-else class="c-picture-uploader-picture-box-icon-wrap" @click="handleClick">
          <icon class="c-picture-uploader-picture-box-icon" name="add"></icon>
        </div>
      </div>

      <div class="c-uploader-file-select-block"
           @drop.prevent="onDrop"
           @click.prevent="handleClick"
           @dragover.prevent="dragOver = true"
           @dragleave.prevent="dragOver = false" v-else-if="drag">
        <icon class="c-uploader-file-icon" name="upload"></icon>
        <slot></slot>
      </div>

      <div @click="handleClick" v-else class="c-uploader-trigger">
        <slot></slot>
      </div>

      <input ref="input" type="file" @change="handleChange" accept="accept">
    </div>

    <transition name="fade">
      <c-progress
          v-if="shownProgress"
          :stroke-width="2"
          type="line"
          :show-text="false"
          :percentage="parsePercentage(file.percentage)"
          :status="file.status === 'finished' ? 'success' : null"></c-progress>
    </transition>

    <c-upload-list v-if="showUploadList && type==='file'"
                   :files="files"
                   :baseUrl="baseUrl"
                   @file-remove="handleRemove"
                   :onPreview="onPreview"></c-upload-list>
  </div>
</template>

<script>
import UploadBase from './UploadBase';

export default {
  name: 'SingleUploader',
  mixins: [ UploadBase ],
  computed: {
    classes () {
      return [
        {
          multiple: this.multiple,
          block: this.block,
          radius: this.radius
        }
      ];
    },
    file () {
      return this.files[0];
    },
    filePath () {
      if (!this.file) {
        return null;
      }
      const file = this.file;

      if (file.status !== 'success') {
        return file.url;
      }
      if (file.filePath) {
        if (file.filePath.includes('//')) {
          return file.filePath;
        }
        return this.baseUrl + file.filePath;
      }
      return null;
    },
    shownProgress() {
      return this.file?.status === 'uploading' && this.isShowProgress;
    }
  },
  data () {
    return {
      dragOver: false
    };
  },
  methods: {
    parsePercentage (value) {
      return parseInt(value, 10);
    },
    clearFile () {
      this.$emit('input', null);
    }
  }
};
</script>
