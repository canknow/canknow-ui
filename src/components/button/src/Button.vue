<template>
  <a v-if="to"
     :class="classes"
     :disabled="disabled"
     :href="linkUrl"
     :target="target"
     @click.exact="handleClickLink($event, false)"
     @click.ctrl="handleClickLink($event, true)"
     @click.meta="handleClickLink($event, true)">
    <icon class="c-button-loading-icon" name="loading" v-if="loading"></icon>
    <icon class="c-button-sync-icon" name="sync" v-else-if="syncing"></icon>
    <icon :name="icon" v-else-if="icon"></icon>
    <slot v-else-if="type==='icon'"></slot>
    <label class="c-button-label" v-if="type!=='icon' && $slots.default">
      <slot v-if="!showLoadingText"></slot>
      <span v-else>{{loadingText}}</span>
    </label>
  </a>
  <component
      v-else
      :is="tag"
      :type="htmlType"
      :class="classes"
      :disabled="disabled||loading"
      @click="handleClickLink">
    <icon class="c-button-loading-icon" name="loading" v-if="loading"></icon>
    <icon class="c-button-sync-icon" name="sync" v-else-if="syncing"></icon>
    <icon :name="icon" v-else-if="icon"></icon>
    <slot v-else-if="type==='icon'"></slot>
    <label class="c-button-label" v-if="type!=='icon' && $slots.default">
      <slot v-if="!showLoadingText"></slot>
      <span v-else>{{loadingText}}</span>
    </label>
  </component>
</template>
<script>
import { oneOf } from 'canknow-ui-core/src/utils/assist';
import mixinsLink from '../../../mixins/link';
import sceneMixin from '../../../mixins/sceneMixin';
import formComponent from '../../../mixins/formComponent';

export default {
  name: 'CButton',
  mixins: [ mixinsLink, sceneMixin, formComponent ],
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      validator (value) {
        return oneOf(value, ['text', 'icon']);
      },
      default: 'text'
    },
    lightShadow: Boolean,
    long: Boolean,
    bold: Boolean,
    syncing: Boolean,
    dashed: Boolean,
    fill: Boolean,
    loading: Boolean,
    ghost: Boolean,
    text: Boolean,
    loadingText: {
      type: String
    },
    disabled: Boolean,
    htmlType: {
      default: 'button',
      validator (value) {
        return oneOf(value, ['button', 'submit', 'reset']);
      }
    },
    icon: {
      type: String,
      default: ''
    },
    plain: Boolean
  },
  computed: {
    showLoadingText(){
      return this.loadingText && this.loading;
    },
    classes () {
      return [
        'c-button',
        {
          ...this.formComponentClasses,
          ['light-shadow']: !!this.lightShadow,
          long: !!this.long,
          bold: !!this.bold,
          ['is-loading']: !!this.loading,
          syncing: !!this.syncing,
          [`c-${this.type}-button`]: !!this.type,
          [this.scene]: !!this.scene,
          border: !!this.border,
          dashed: !!this.dashed,
          fill: !!this.fill,
          ghost: !!this.ghost,
          text: !!this.text,
          plain: !!this.plain
        }
      ];
    }
  },
  methods: {
    // Ctrl or CMD and click, open in new window when use `to`
    handleClickLink (event, new_window = false) {
      this.$emit('click', event);
      this.handleCheckClick(event, new_window);
    }
  },
};
</script>
