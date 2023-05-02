<template>
  <div class="c-skeleton" v-if="loading" :class="classes">
    <div class="c-skeleton-header" v-if="hasAvatar">
      <skeleton-element v-bind="avatarBasicProps" prefix-class="c-skeleton-avatar"></skeleton-element>
    </div>
    <div class="c-skeleton-content" v-if="hasTitle || hasParagraph">
      <skeleton-title v-bind="titleBasicProps" v-if="hasTitle"></skeleton-title>
      <skeleton-paragraph v-bind="paragraphBasicProps" v-if="hasParagraph"></skeleton-paragraph>
    </div>
  </div>
</template>

<script>
import SkeletonParagraph from './SkeletonParagraph';
import SkeletonTitle from './SkeletonTitle';
import SkeletonElement from './SkeletonElement';

export default {
  name: 'CSkeleton',
  components: { SkeletonElement, SkeletonTitle, SkeletonParagraph },
  props: {
    avatar: {
      type: Boolean,
      default: false
    },
    title: {
      type: Boolean,
      default: true
    },
    paragraph: {
      type: [Boolean, Object],
      default: true
    },
    active: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    buttonShape: {
      type: String,
      default: 'default'
    },
    avatarShape: {
      type: String,
      default: 'circle'
    },
    round: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasAvatar () {
      return !!this.avatar;
    },
    hasTitle() {
      return !!this.title;
    },
    hasParagraph() {
      return !!this.paragraph;
    },
    classes () {
      return {
        'with-avatar': this.hasAvatar,
        active: this.active,
        round: this.round
      };
    },
    avatarBasicProps () {
      if (this.hasTitle && !this.hasParagraph) {
        // Square avatar
        return { size: 'large', shape: 'square' };
      }
      return { size: 'large', shape: 'circle' };
    },
    titleBasicProps () {
      if (!this.hasAvatar && this.hasParagraph) {
        return { width: '38%' };
      }

      if (this.hasAvatar && this.hasParagraph) {
        return { width: '50%' };
      }

      return {};
    },
    paragraphBasicProps () {
      const basicProps = {};

      // Width
      if (!this.hasAvatar || !this.hasTitle) {
        basicProps.width = '61%';
      }

      // Rows
      if (!this.hasAvatar && this.hasTitle) {
        basicProps.rows = 3;
      }
      else {
        basicProps.rows = 2;
      }
      return basicProps;
    }
  }
};
</script>
