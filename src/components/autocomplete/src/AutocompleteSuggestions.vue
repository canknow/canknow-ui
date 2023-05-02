<template>
  <transition name="zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="c-autocomplete-suggestion popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <scrollbar
        tag="ul"
        wrap-class="c-autocomplete-suggestion-wrap"
        view-class="c-autocomplete-suggestion-list">
        <li v-if="!parent.hideLoading && parent.loading"><icon class="icon-loading" name="loading"></icon></li>
        <slot v-else></slot>
      </scrollbar>
    </div>
  </transition>
</template>
<script>
import Popper from '../../../utils/vue-popper';
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import Scrollbar from '../../scrollbar';

export default {
  components: { Scrollbar },
  mixins: [Popper, Emitter],
  name: 'CAutocompleteSuggestions',
  componentName: 'AutocompleteSuggestions',
  data() {
    return {
      parent: this.$parent,
      dropdownWidth: ''
    };
  },
  props: {
    options: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    id: String
  },
  methods: {
    select(item) {
      this.dispatch('CAutocomplete', 'item-click', item);
    }
  },
  updated() {
    this.$nextTick(_ => {
      this.popperJS && this.updatePopper();
    });
  },
  mounted() {
    this.$parent.popperElement = this.popperElement = this.$el;
    this.referenceElement = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
    this.referenceList = this.$el.querySelector('.c-autocomplete-suggestion-list');
    this.referenceList.setAttribute('role', 'listbox');
    this.referenceList.setAttribute('id', this.id);
  },
  created() {
    this.$on('visible', (value, inputWidth) => {
      this.dropdownWidth = inputWidth + 'px';
      this.showPopper = value;
    });
  }
};
</script>
