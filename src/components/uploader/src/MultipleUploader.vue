<template>
  <div class="c-uploader" :class="classes">
    <div class="c-uploader-box" v-if="showUploadList && type==='image'">
      <picture-upload-list :files="files"
                           :baseUrl="baseUrl"
                           :height="height"
                           :defaultPicture="defaultPicture"
                           :handle-preview="handlePreview"
                           @file-remove="handleRemove">
        <div class="c-picture-uploader-picture-box" @click="handleClick" :style="{ width: width + 'px', height: height + 'px'}">
          <img class="c-picture-uploader-picture-box-img" :height="height" :src="defaultPicture" v-if="defaultPicture"/>

          <div v-else class="c-picture-uploader-picture-box-icon-wrap">
            <icon class="c-picture-uploader-picture-box-icon" name="add"></icon>
          </div>
       
          <input ref="input" type="file" @change="handleChange" multiple accept="accept">
        </div>
      </picture-upload-list>
    </div>

    <div class="c-uploader-box" v-else>
      <div @click="handleClick" v-if="!drag">
        <slot></slot>
      </div>
      <input ref="input" type="file" @change="handleChange" multiple accept="accept">

      <div class="c-uploader-file-select-block"
           @drop.prevent="onDrop"
           @dragover.prevent="dragOver = true"
           @dragleave.prevent="dragOver = false"
           v-if="drag">
        <icon name="upload" class="c-uploader-file-icon"></icon>
        <slot></slot>
      </div>
    </div>

    <upload-list v-if="showUploadList && type==='file'"
                 :files="files"
                 :baseUrl="baseUrl"
                 @file-remove="handleRemove"
                 :handle-preview="handlePreview"></upload-list>
  </div>
</template>

<script>
import UploadList from './UploadList';
import PictureUploadList from './PictureUploadList';
import UploadBase from './UploadBase';

export default {
  name: 'MultipleUploader',
  mixins: [ UploadBase ],
  props: {
    handlePreview: Function,
  },
  components: {
    UploadList,
    PictureUploadList
  },
  computed: {
    classes () {
      return [
        {
          ['c-pictures-uploader']: this.showUploadList && this.type === 'image',
          ['block']: !!this.block,
          ['radius']: !!this.radius
        }
      ];
    }
  }
};
</script>
