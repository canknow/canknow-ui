<template>
  <transition name="zoom-in-top" @after-leave="doDestroy">
    <div
        class="c-color-dropdown"
        v-show="showPopper">
      <div class="c-color-dropdown-main-wrapper">
        <hue-slider ref="hue" :color="color" vertical style="float: right;"></hue-slider>
        <sv-panel ref="sl" :color="color"></sv-panel>
      </div>
      <alpha-slider v-if="showAlpha" ref="alpha" :color="color"></alpha-slider>
      <predefine v-if="predefine" :color="color" :colors="predefine"></predefine>
      <div class="component-span-top flex-horizontal flex-middle">
        <div class="c-color-dropdown-value flex-adapter">
          <c-input
              v-model="customInput"
              @keyup.native.enter="handleConfirm"
              @blur="handleConfirm"
              :validate-event="false"
              size="small">
          </c-input>
        </div>
        <c-button
            class="component-span-left"
            size="small"
            @click="$emit('clear')">
          {{ t('core.colorPicker.clear') }}
        </c-button>
        <c-button
            size="small"
            scene="primary"
            @click="confirmValue">
          {{ t('core.colorPicker.confirm') }}
        </c-button>
      </div>
    </div>
  </transition>
</template>

<script>
import SvPanel from './SvPanel';
import HueSlider from './ColorBueSlider';
import AlphaSlider from './ColorAlphaSlider';
import Predefine from './Predefine';
import Popper from '../../../../utils/vue-popper';
import Locale from '../../../../mixins/locale';

export default {
  name: 'ColorPickerDropdown',
  mixins: [Popper, Locale],
  components: {
    SvPanel,
    HueSlider,
    AlphaSlider,
    Predefine
  },
  props: {
    color: {
      required: true
    },
    showAlpha: Boolean,
    predefine: Array
  },

  data() {
    return {
      customInput: ''
    };
  },
  computed: {
    currentColor() {
      const parent = this.$parent;
      return !parent.value && !parent.showPanelColor ? '' : parent.color.value;
    }
  },

  methods: {
    confirmValue() {
      this.$emit('pick');
    },
    handleConfirm() {
      this.color.fromString(this.customInput);
    }
  },

  mounted() {
    this.$parent.popperElement = this.popperElement = this.$el;
    this.referenceElm = this.$parent.$el;
  },

  watch: {
    showPopper(val) {
      if (val === true) {
        this.$nextTick(() => {
          const { sl, hue, alpha } = this.$refs;
          sl && sl.update();
          hue && hue.update();
          alpha && alpha.update();
        });
      }
    },
    currentColor: {
      immediate: true,
      handler(val) {
        this.customInput = val;
      }
    }
  }
};
</script>
