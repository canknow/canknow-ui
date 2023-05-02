<template>
  <div class="c-empty">
    <img class="c-empty-image" :style="imageStyle" v-if="image" :src="image" ondragstart="return false">
    <icon class="c-empty-icon" name="empty" v-else></icon>

    <div class="c-empty-description">
      <slot v-if="$slots.description" name="description"></slot>
      <p v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" class="c-empty-bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { t } from '../../../locale/index';

export default {
  name: 'CEmpty',
  props: {
    image: {
      type: String,
      default: ''
    },
    imageSize: Number,
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    emptyDescription() {
      return this.description || t('core.empty.description');
    },
    imageStyle() {
      return {
        width: this.imageSize ? `${this.imageSize}px` : ''
      };
    }
  }
};
</script>
