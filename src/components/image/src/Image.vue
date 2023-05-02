<template>
    <div class="c-image" :style="styles">
        <slot v-if="loading" name="placeholder">
            <div class="c-image-placeholder"></div>
        </slot>
        <slot v-else-if="error" name="error">
            <div class="c-image-error">
                <img :src="errorPicture" v-if="errorPicture">
                <div class="c-image-error-icon-wrap" v-else>
                    <icon class="c-image-error-icon" name="image-broken"></icon>
                </div>
            </div>
        </slot>
        <img v-else
             class="c-image-inner"
             @click="clickHandler"
             v-bind="$attrs"
             v-on="$listeners"
             :src="imageUrl"
             :style="imageStyle"
             :class="{ 'image-inner-center': alignCenter }">
        <image-viewer :z-index="zIndex" :initial-index="imageIndex" v-if="preview && showViewer" :onClose="closeViewer" :images="previewImages"/>
    </div>
</template>

<script>
import Locale from './../../../mixins/locale';
import { on, off, getScrollContainer, isInContainer } from 'canknow-core/src/libs';
import { isString } from 'canknow-core/src/libs';
import { isHtmlElement } from 'canknow-core/src/libs';
import { throttle } from 'canknow-core/src/libs';
import container from './../../../container';
import ImageViewer from './ImageViewer';

const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down'
};

let prevOverflow = '';

export default {
  name: 'CImage',
  mixins: [Locale],
  components: {
    ImageViewer
  },
  inheritAttrs: false,
  props: {
    src: String,
    baseUrl: {
      type: String
    },
    fit: String,
    lazy: Boolean,
    scrollContainer: {},
    defaultImage: {
      type: String
    },
    noPicture: {
      type: String
    },
    errorPicture: {
      type: String
    },
    shape: {
      type: String,
      default: 'square'
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    proxy: {
      type: String
    },
    previewImages: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      loading: true,
      error: false,
      show: !this.lazy,
      imageWidth: 0,
      imageHeight: 0,
      showViewer: false
    };
  },
  computed: {
    imageIndex() {
      let previewIndex = 0;
      const srcIndex = this.previewImages.indexOf(this.src);

      if (srcIndex >= 0) {
        previewIndex = srcIndex;
      }
      return previewIndex;
    },
    preview() {
      const { previewImages } = this;
      return Array.isArray(previewImages) && previewImages.length > 0;
    },
    computedBaseUrl () {
      return this.baseUrl || container.config.baseUrl;
    },
    styles () {
      const styles = {};
      if (this.width) {
        styles.width = this.width + 'px';
      }
      if (this.height) {
        styles.height = this.height + 'px';
      }
      return styles;
    },
    imageStyle() {
      const styles = {};
      const { fit } = this;
      if (this.width) {
        styles.width = this.width + 'px';
      }
      if (this.height) {
        styles.height = this.height + 'px';
      }
      if (fit) {
        if (isSupportObjectFit()) {
          Object.assign(styles, { 'object-fit': fit });
        }
        else {
          Object.assign(styles, { 'object-fit': this.getImageStyle(fit) });
        }
      }
      return styles;
    },
    alignCenter() {
      return !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
    },
    imageUrl () {
      return this.getUrl(this.src, this.proxy);
    }
  },
  watch: {
    src(value) {
      this.show && this.loadImage();
    },
    show(value) {
      value && this.loadImage();
    }
  },
  mounted() {
    if (this.lazy) {
      this.addLazyLoadListener();
    }
    else {
      this.loadImage();
    }
  },
  beforeDestroy() {
    this.lazy && this.removeLazyLoadListener();
  },
  methods: {
    getUrl (url, proxy) {
      let tempUrl = url;

      if (!url) {
        return this.noPicture || this.defaultImage;
      }
      if (!tempUrl.includes('//')) {
        tempUrl = this.computedBaseUrl + url;
      }
      if (proxy) {
        tempUrl = proxy + tempUrl;
      }
      return tempUrl;
    },
    loadImage() {
      // reset status
      this.loading = true;
      this.error = false;

      const img = new Image();
      img.onload = e => this.handleLoad(e, img);
      img.onerror = this.handleError.bind(this);

      // bind html attrs
      // so it can behave consistently
      Object.keys(this.$attrs).forEach((key) => {
        const value = this.$attrs[key];
        img.setAttribute(key, value);
      });
      img.src = this.imageUrl;
    },
    handleLoad(e, img) {
      this.imageWidth = img.width;
      this.imageHeight = img.height;
      this.loading = false;
      this.error = false;
    },
    handleError(e) {
      this.loading = false;
      this.error = true;
      this.$emit('error', e);
    },
    handleLazyLoad() {
      if (isInContainer(this.$el, this._scrollContainer)) {
        this.show = true;
        this.removeLazyLoadListener();
      }
    },
    addLazyLoadListener() {
      const { scrollContainer } = this;
      let _scrollContainer = null;

      if (isHtmlElement(scrollContainer)) {
        _scrollContainer = scrollContainer;
      }
      else if (isString(scrollContainer)) {
        _scrollContainer = document.querySelector(scrollContainer);
      }
      else {
        _scrollContainer = getScrollContainer(this.$el);
      }

      if (_scrollContainer) {
        this._scrollContainer = _scrollContainer;
        this._lazyLoadHandler = throttle(this.handleLazyLoad, 200);
        on(_scrollContainer, 'scroll', this._lazyLoadHandler);
        this.handleLazyLoad();
      }
    },
    removeLazyLoadListener() {
      const { _scrollContainer, _lazyLoadHandler } = this;

      if (!_scrollContainer || !_lazyLoadHandler) return;

      off(_scrollContainer, 'scroll', _lazyLoadHandler);
      this._scrollContainer = null;
      this._lazyLoadHandler = null;
    },
    /**
             * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
             */
    getImageStyle(fit) {
      const { imageWidth, imageHeight } = this;
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight
      } = this.$el;

      if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) {
        return {};
      }

      const imageAspectRatio = imageWidth / imageHeight;
      const containerAspectRatio = containerWidth / containerHeight;

      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
      }

      switch (fit) {
        case ObjectFit.NONE:
          return { width: 'auto', height: 'auto' };
        case ObjectFit.CONTAIN:
          return (imageAspectRatio < containerAspectRatio) ? { width: 'auto' } : { height: 'auto' };
        case ObjectFit.COVER:
          return (imageAspectRatio < containerAspectRatio) ? { height: 'auto' } : { width: 'auto' };
        default:
          return {};
      }
    },
    clickHandler() {
      // don't show viewer when preview is false
      if (!this.preview) {
        return;
      }
      // prevent body scroll
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      this.showViewer = true;
    },
    closeViewer() {
      document.body.style.overflow = prevOverflow;
      this.showViewer = false;
    }
  }
};
</script>
