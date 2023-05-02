<template>
  <div class="c-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`c-collapse-content-${id}`"
      :aria-describedby ="`c-collapse-content-${id}`">
      <div
        class="c-collapse-item-header"
        @click="handleHeaderClick"
        role="button"
        :id="`c-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false">
        <slot name="title">{{title}}</slot>
        <icon name="right" :class="{'active': isActive}" class="c-collapse-item-arrow"></icon>
      </div>
    </div>
    <collapse-transition>
      <div
        class="c-collapse-item-wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`c-collapse-head-${id}`"
        :id="`c-collapse-content-${id}`">
        <div class="c-collapse-item-content">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import { generateId } from '../../../utils/util';

export default {
  name: 'CCollapseItem',
  componentName: 'CCollapseItem',
  mixins: [Emitter],
  data() {
    return {
      contentWrapStyle: {
        height: 'auto',
        display: 'block'
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
      id: generateId()
    };
  },
  inject: ['collapse'],
  props: {
    title: String,
    name: {
      type: [String, Number],
      default() {
        return this._uid;
      }
    },
    disabled: Boolean
  },
  computed: {
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) > -1;
    }
  },
  methods: {
    handleFocus() {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true;
        }
        else {
          this.isClick = false;
        }
      }, 50);
    },
    handleHeaderClick() {
      if (this.disabled) return;
      this.dispatch('CCollapse', 'item-click', this);
      this.focusing = false;
      this.isClick = true;
    },
    handleEnterClick() {
      this.dispatch('CCollapse', 'item-click', this);
    }
  }
};
</script>
