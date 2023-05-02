<template>
  <div class="c-color-picker"
      :class="[colorDisabled ? 'disabled' : '', colorSize ? colorSize : '', block ? 'block': '' ]"
      v-clickoutside="hide">
    <div class="c-color-picker-mask" v-if="colorDisabled"></div>
    <div class="c-color-picker-trigger" @click="handleTrigger">
      <span class="c-color-picker-color" :class="{ 'alpha': showAlpha }">
        <span class="c-color-picker-color-inner"
          :style="{
            backgroundColor: displayedColor
          }"></span>
        <span class="c-color-picker-empty icon-close" v-if="!value && !showPanelColor"></span>
      </span>
      <icon class="c-color-picker-icon" name="down" v-show="value || showPanelColor"></icon>
    </div>
    <picker-dropdown
       ref="dropdown"
       :class="['c-color-picker-panel', popperClass || '']"
       v-model="showPicker"
       @pick="confirmValue"
       @clear="clearValue"
       :color="color"
       :show-alpha="showAlpha"
       :predefine="predefine">
    </picker-dropdown>
  </div>
</template>

<script>
import Color from './color';
import PickerDropdown from './components/ColorPickerDropdown.vue';
import Clickoutside from 'canknow-ui-core/src/directives/clickoutside';
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  name: 'CColorPicker',
  mixins: [Emitter],
  props: {
    value: String,
    showAlpha: Boolean,
    colorFormat: String,
    disabled: Boolean,
    size: String,
    popperClass: String,
    predefine: Array,
    block: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    form: {
      default: ''
    },
    formItem: {
      default: ''
    }
  },
  directives: { Clickoutside },
  computed: {
    displayedColor() {
      if (!this.value && !this.showPanelColor) {
        return 'transparent';
      }
      return this.displayedRgb(this.color, this.showAlpha);
    },
    _formItemSize() {
      return (this.formItem || {}).formItemSize;
    },
    colorSize() {
      return this.size || this._formItemSize || (this.$CANKNOW || {}).size;
    },
    colorDisabled() {
      return this.disabled || (this.form || {}).disabled;
    }
  },

  watch: {
    value(val) {
      if (!val) {
        this.showPanelColor = false;
      }
      else if (val && val !== this.color.value) {
        this.color.fromString(val);
      }
    },
    color: {
      deep: true,
      handler() {
        this.showPanelColor = true;
      }
    },
    displayedColor(val) {
      if (!this.showPicker) return;
      const currentValueColor = new Color({
        enableAlpha: this.showAlpha,
        format: this.colorFormat
      });
      currentValueColor.fromString(this.value);

      const currentValueColorRgb = this.displayedRgb(currentValueColor, this.showAlpha);
      if (val !== currentValueColorRgb) {
        this.$emit('active-change', val);
      }
    }
  },

  methods: {
    handleTrigger() {
      if (this.colorDisabled) return;
      this.showPicker = !this.showPicker;
    },
    confirmValue() {
      const value = this.color.value;
      this.$emit('input', value);
      this.$emit('change', value);
      this.dispatch('CFormItem', 'form.change', value);
      this.showPicker = false;
    },
    clearValue() {
      this.$emit('input', null);
      this.$emit('change', null);

      if (this.value !== null) {
        this.dispatch('CFormItem', 'form.change', null);
      }
      this.showPanelColor = false;
      this.showPicker = false;
      this.resetColor();
    },
    hide() {
      this.showPicker = false;
      this.resetColor();
    },
    resetColor() {
      this.$nextTick(_ => {
        if (this.value) {
          this.color.fromString(this.value);
        }
        else {
          this.showPanelColor = false;
        }
      });
    },
    displayedRgb(color, showAlpha) {
      if (!(color instanceof Color)) {
        throw Error('color should be instance of Color Class');
      }
      const { r, g, b } = color.toRgb();
      return showAlpha
        ? `rgba(${ r }, ${ g }, ${ b }, ${ color.get('alpha') / 100 })`
        : `rgb(${ r }, ${ g }, ${ b })`;
    }
  },
  mounted() {
    const value = this.value;
    if (value) {
      this.color.fromString(value);
    }
    this.popperElement = this.$refs.dropdown.$el;
  },
  data() {
    const color = new Color({
      enableAlpha: this.showAlpha,
      format: this.colorFormat
    });
    return {
      color,
      showPicker: false,
      showPanelColor: false
    };
  },
  components: {
    PickerDropdown
  }
};
</script>
