<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-select class="width-em15" v-model="selectedValue" @change="handleOnChange" :placeholder="t('core.richEditor.toolbar.fontSize.select.placeHolder')">
            <c-option v-for="fontSize in fontSizes" :key="fontSize.name" :value="fontSize.value">{{fontSize.name}}</c-option>
        </c-select>
    </div>
</template>

<script>
import Locale from '../../../../mixins/locale';
const fontSizes = [
  {
    name: '10px',
    value: 1
  },
  {
    name: '12px',
    value: 2
  },
  {
    name: '16px',
    value: 3
  },
  {
    name: '18px',
    value: 4
  },
  {
    name: '24px',
    value: 5
  },
  {
    name: '32px',
    value: 6
  },
  {
    name: '48px',
    value: 7
  }
];

export default {
  name: 'FontSize',
  mixins: [ Locale ],
  props: {
    editor: {
      type: Object
    }
  },
  data () {
    return {
      selectedValue: null,
      fontSizes,
      active: false
    };
  },
  methods: {
    handleOnChange (value) {
      const editor = this.editor;
      editor.command.do('fontSize', value);
    }
  }
};
</script>

