<template>
    <div class="c-select"
         :class="classes"
         @click.stop="toggleMenu"
         v-clickoutside="handleClose">
        <div class="c-select-tags"
             v-if="multiple"
             ref="tags"
             :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
            <div v-if="collapseTags && selected.length">
                <c-tag :closable="!selectDisabled"
                        :size="collapseTagSize"
                        :hit="selected[0].hitState"
                        scene="info"
                        @close="deleteTag($event, selected[0])"
                        disable-transitions>
                    <span class="c-select-tags-text">{{ selected[0].currentLabel }}</span>
                </c-tag>
                <c-tag v-if="selected.length > 1"
                        :closable="false"
                        :size="collapseTagSize"
                         scene="info"
                        disable-transitions>
                    <span class="c-select-tags-text">+ {{ selected.length - 1 }}</span>
                </c-tag>
            </div>
            <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
                <c-tag v-for="item in selected"
                        :key="getValueKey(item)"
                        :closable="!selectDisabled"
                        :size="collapseTagSize"
                        :hit="item.hitState"
                         scene="default"
                        @close="deleteTag($event, item)"
                        disable-transitions>
                    <span class="c-select-tags-text">{{ item.currentLabel }}</span>
                </c-tag>
            </transition-group>
            <input type="text"
                    class="c-select-input"
                    :class="[size]"
                    :disabled="selectDisabled"
                    :autocomplete="autoComplete || autocomplete"
                    @focus="handleFocus"
                    @blur="softFocus = false"
                    @keyup="managePlaceholder"
                    @keydown="resetInputState"
                    @keydown.down.prevent="navigateOptions('next')"
                    @keydown.up.prevent="navigateOptions('prev')"
                    @keydown.enter.prevent="selectOption"
                    @keydown.esc.stop.prevent="visible = false"
                    @keydown.delete="deletePrevTag"
                    @keydown.tab="visible = false"
                    @compositionstart="handleComposition"
                    @compositionupdate="handleComposition"
                    @compositionend="handleComposition"
                    v-model="query"
                    @input="debouncedQueryChange"
                    v-if="filterable"
                    :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }"
                    ref="input">
        </div>
        <c-input ref="reference"
                v-model="selectedLabel"
                type="text"
                :placeholder="currentPlaceholder"
                :name="name"
                :id="id"
                :autocomplete="autoComplete || autocomplete"
                :size="size"
                :disabled="selectDisabled"
                :readonly="readonly"
                :validate-event="false"
                :class="{ 'focus': visible }"
                :tabindex="(multiple && filterable) ? '-1' : null"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="debouncedOnInputChange"
                @keydown.native.down.stop.prevent="navigateOptions('next')"
                @keydown.native.up.stop.prevent="navigateOptions('prev')"
                @keydown.native.enter.prevent="selectOption"
                @keydown.native.esc.stop.prevent="visible = false"
                @keydown.native.tab="visible = false"
                @mouseenter.native="inputHovering = true"
                @mouseleave.native="inputHovering = false">
            <template slot="prefix" v-if="$slots.prefix">
                <slot name="prefix"></slot>
            </template>
            <template slot="suffix">
                <icon v-show="!showClose" name="down" class="c-select-caret" :class="{'reverse-icon': visible}"></icon>
                <icon v-if="showClose" name="remove-circle" class="c-select-clear c-input-icon" @click.native="handleClearClick"></icon>
            </template>
        </c-input>
        <transition name="zoom-in-top"
                    @before-enter="handleMenuEnter"
                    @after-leave="doDestroy">
            <select-dropdown ref="popper" :append-to-body="popperAppendToBody" v-show="visible && emptyText !== false">
                <scrollbar tag="ul"
                        wrap-class="c-select-dropdown-wrap"
                        view-class="c-select-dropdown-list"
                        ref="scrollbar"
                        :class="{ 'empty': !allowCreate && query && filteredOptionsCount === 0 }"
                        v-show="options.length > 0 && !loading">
                    <c-option :value="query" created v-if="showNewOption"></c-option>
                    <slot></slot>
                </scrollbar>
                <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.length === 0 ))">
                    <slot name="empty" v-if="$slots.empty"></slot>
                    <p class="c-select-dropdown-empty" v-else>{{ emptyText }}</p>
                </template>
            </select-dropdown>
        </transition>
    </div>
</template>
<script>
import clickoutside from 'canknow-ui-core/src/directives/clickoutside';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import Locale from '../../../mixins/locale';
import Focus from '../../../mixins/focus';
import { debounce, getValueByPath, valueEquals } from 'canknow-core/src/libs';
import formComponent from '../../../mixins/formComponent';
import SelectDropdown from './SelectDropdown';
import scrollIntoView from './../../../../src/utils/scroll-into-view';
import NavigationMixin from './navigation-mixin';
import { addResizeListener, removeResizeListener } from '../../../utils/resize-event';
import { isEdge, isIE } from '../../../utils/util';
import Scrollbar from '../../scrollbar/src/Scrollbar';
import { isKorean } from '../../../utils/shared';
import log from '../../../utils/log';

export default {
  name: 'CSelect',
  mixins: [Emitter, Locale, Focus('reference'), NavigationMixin, formComponent],
  provide() {
    return {
      'select': this
    };
  },
  components: {
    SelectDropdown,
    Scrollbar
  },
  directives: { clickoutside },
  props: {
    id: String,
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(value) {
        process.env.NODE_ENV !== 'production' &&
                    log.warn('[Select]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
        return true;
      }
    },
    automaticDropdown: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      required: false
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },
  computed: {
    classes () {
      return {
        ...this.formComponentClasses
      };
    },
    readonly() {
      return !this.filterable || this.multiple || (!isIE() && !isEdge() && !this.visible);
    },
    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== '';
      return this.clearable &&
          !this.selectDisabled &&
          this.inputHovering &&
          hasValue;
    },
    iconClass() {
      return !(this.remote && this.filterable) && this.visible;
    },
    debounce() {
      return this.remote ? 300 : 0;
    },
    emptyText() {
      if (this.loading) {
        return this.loadingText || this.t('core.select.loading');
      }
      else {
        if (this.remote && this.query === '' && this.options.length === 0) return false;
        if (this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || this.t('core.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t('core.select.noData');
        }
      }
      return null;
    },
    showNewOption() {
      let hasExistingOption = this.options.filter(option => !option.created)
        .some(option => option.currentLabel === this.query);
      return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
    },
    selectDisabled() {
      return this.disabled || (this.form || {}).disabled;
    },
    collapseTagSize() {
      return ['small', 'smaller'].indexOf(this.size) > -1 ? 'smaller' : 'small';
    },
    propPlaceholder() {
      return typeof this.placeholder !== 'undefined' ? this.placeholder : this.t('core.select.placeholder');
    }
  },
  watch: {
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    propPlaceholder(value) {
      this.cachedPlaceHolder = this.currentPlaceholder = value;
    },
    value(value, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();

        if ((value && value.length > 0) || (this.$refs.input && this.query !== '')) {
          this.currentPlaceholder = '';
        }
        else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!valueEquals(value, oldVal)) {
        this.dispatch('CFormItem', 'form.change', value);
      }
    },
    visible(value) {
      if (!value) {
        this.broadcast('CSelectDropdown', 'destroyPopper');

        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = '';
        this.previousQuery = null;
        this.selectedLabel = '';
        this.inputLength = 20;
        this.menuVisibleOnFocus = false;
        this.resetHoverIndex();
        this.$nextTick(() => {
          if (this.$refs.input &&
                            this.$refs.input.value === '' &&
                            this.selected.length === 0) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (this.filterable && this.allowCreate &&
                                this.createdSelected && this.createdLabel) {
              this.selectedLabel = this.createdLabel;
            }
            else {
              this.selectedLabel = this.selected.shownLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      }
      else {
        this.broadcast('CSelectDropdown', 'updatePopper');

        if (this.filterable) {
          this.query = this.remote ? '' : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          }
          else {
            if (!this.remote) {
              this.broadcast('COption', 'queryChange', '');
              this.broadcast('COptionGroup', 'queryChange');
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = '';
            }
          }
        }
      }
      this.$emit('visible-change', value);
    },
    options() {
      if (this.$isServer) return;
      this.$nextTick(() => {
        this.broadcast('CSelectDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      let inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    }
  },
  methods: {
    handleComposition(event) {
      const text = event.target.value;

      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.$nextTick(_ => this.handleQueryChange(text));
      }
      else {
        const lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !isKorean(lastCharacter);
      }
    },
    handleQueryChange(value) {
      if (this.previousQuery === value || this.isOnComposition) return;
      if (this.previousQuery === null && (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')) {
        this.previousQuery = value;
        return;
      }
      this.previousQuery = value;
      this.$nextTick(() => {
        if (this.visible) this.broadcast('CSelectDropdown', 'updatePopper');
      });
      this.hoverIndex = -1;
      if (this.multiple && this.filterable) {
        this.$nextTick(() => {
          const length = this.$refs.input.value.length * 15 + 20;
          this.inputLength = this.collapseTags ? Math.min(50, length) : length;
          this.managePlaceholder();
          this.resetInputHeight();
        });
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1;
        this.remoteMethod(value);
      }
      else if (typeof this.filterMethod === 'function') {
        this.filterMethod(value);
        this.broadcast('COptionGroup', 'queryChange');
      }
      else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('COption', 'queryChange', value);
        this.broadcast('COptionGroup', 'queryChange');
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    },
    scrollToOption(option) {
      const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;

      if (this.$refs.popper && target) {
        const menu = this.$refs.popper.$el.querySelector('.c-select-dropdown-wrap');
        scrollIntoView(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    handleMenuEnter() {
      this.$nextTick(() => this.scrollToOption(this.selected));
    },
    emitChange(value) {
      if (!valueEquals(this.value, value)) {
        this.$emit('change', value);
      }
    },
    getOption(value) {
      let option;
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
      const isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';

      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i];
        const isEqual = isObject
          ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
          : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) {
        return option;
      }
      const label = (!isObject && !isNull && !isUndefined) ? value : '';
      let newOption = {
        value: value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },
    setSelected() {
      if (!this.multiple) {
        let option = this.getOption(this.value);

        if (option.created) {
          this.createdLabel = option.shownLabel;
          this.createdSelected = true;
        }
        else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.shownLabel;
        this.selected = option;

        if (this.filterable) {
          this.query = this.selectedLabel;
        }
        return;
      }
      let result = [];

      if (Array.isArray(this.value)) {
        this.value.forEach(value => {
          result.push(this.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.filterable) {
          this.visible = true;

          if (this.filterable) {
            this.menuVisibleOnFocus = true;
          }
        }
        this.$emit('focus', event);
      }
      else {
        this.softFocus = false;
      }
    },
    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false;
        }
        else {
          this.$emit('blur', event);
        }
      }, 50);
      this.softFocus = false;
    },
    handleClearClick(event) {
      this.deleteSelected(event);
    },
    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    handleClose() {
      this.visible = false;
    },
    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) {
        return;
      }
      const option = this.selected[this.selected.length - 1];
      if (!option) {
        return;
      }

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },
    deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        const value = this.value.slice();
        value.pop();
        this.$emit('input', value);
        this.emitChange(value);
      }
    },
    managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
      }
    },
    resetInputState(e) {
      if (e.keyCode !== 8) {
        this.toggleLastOptionHitState(false);
      }
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },
    resetInputHeight() {
      if (this.collapseTags && !this.filterable) {
        return;
      }
      this.$nextTick(() => {
        if (!this.$refs.reference) {
          return;
        }
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
        const tags = this.$refs.tags;
        const tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
        const sizeInMap = this.initialInputHeight || 32;
        input.style.height = this.selected.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tagsHeight + (tagsHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px';
        if (this.visible && this.emptyText !== false) {
          this.broadcast('CSelectDropdown', 'updatePopper');
        }
      });
    },
    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.options.indexOf(this.selected);
        }
        else {
          if (this.selected.length > 0) {
            this.hoverIndex = Math.min.apply(null, this.selected.map(item => this.options.indexOf(item)));
          }
          else {
            this.hoverIndex = -1;
          }
        }
      }, 300);
    },
    handleOptionSelect(option, byClick) {
      if (this.multiple) {
        const value = (this.value || []).slice();
        const optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        }
        else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value);
        }
        this.$emit('input', value);
        this.emitChange(value);

        if (option.created) {
          this.query = '';
          this.handleQueryChange('');
          this.inputLength = 20;
        }
        if (this.filterable) {
          this.$refs.input.focus();
        }
      }
      else {
        this.$emit('input', option.value);
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      this.setSoftFocus();

      if (this.visible) {
        return;
      }
      this.$nextTick(() => {
        this.scrollToOption(option);
      });
    },
    setSoftFocus() {
      this.softFocus = true;
      const input = this.$refs.input || this.$refs.reference;

      if (input) {
        input.focus();
      }
    },
    getValueIndex(arr = [], value) {
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';

      if (!isObject) {
        return arr.indexOf(value);
      }
      else {
        const valueKey = this.valueKey;
        let index = -1;
        arr.some((item, i) => {
          if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
            index = i;
            return true;
          }
          return false;
        });
        return index;
      }
    },
    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        }
        else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },
    selectOption() {
      if (!this.visible) {
        this.toggleMenu();
      }
      else {
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex]);
        }
      }
    },
    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
    },
    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag);

      if (index > -1 && !this.selectDisabled) {
        const value = this.value.slice();
        value.splice(index, 1);
        this.$emit('input', value);
        this.emitChange(value);
        this.$emit('remove-tag', tag.value);
      }
      event.stopPropagation();
    },
    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },
    onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--;
        this.filteredOptionsCount--;
        this.options.splice(index, 1);
      }
    },
    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },
    handleResize() {
      this.resetInputWidth();

      if (this.multiple) {
        this.resetInputHeight();
      }
    },
    checkDefaultFirstOption() {
      this.hoverIndex = -1;
      // highlight the created option
      let hasCreated = false;

      for (let i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) {
        return;
      }
      for (let i = 0; i !== this.options.length; ++i) {
        const option = this.options[i];

        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = i;
            break;
          }
        }
        else {
          // highlight currently selected option
          if (option.itemSelected) {
            this.hoverIndex = i;
            break;
          }
        }
      }
    },
    getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value;
      }
      else {
        return getValueByPath(item.value, this.valueKey);
      }
    }
  },
  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;

    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = debounce(() => {
      this.onInputChange();
    }, this.debounce);

    this.debouncedQueryChange = debounce((e) => {
      this.handleQueryChange(e.target.value);
    }, this.debounce);

    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('setSelected', this.setSelected);
  },
  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = '';
    }
    addResizeListener(this.$el, this.handleResize);

    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 32,
        small: 24,
        smaller: 18
      };
      const input = reference.$el.querySelector('input');
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.size];
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) {
      removeResizeListener(this.$el, this.handleResize);
    }
  }
};
</script>
