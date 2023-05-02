<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-select class="width-em15" v-model="selectedValue" @change="handleOnChange" :placeholder="t('core.richEditor.toolbar.fontName.select.placeHolder')">
            <c-option v-for="fontName in fontNames" :key="fontName" :value="fontName">{{fontName}}</c-option>
        </c-select>
    </div>
</template>

<script>
import Locale from '../../../../mixins/locale';
const fontNames = [
  '宋体',
  '微软雅黑',
  'Arial',
  'Tahoma',
  'Verdana'
];

export default {
  name: 'FontName',
  mixins: [ Locale ],
  props: {
    editor: {
      type: Object
    }
  },
  data () {
    return {
      selectedValue: null,
      fontNames,
      active: false
    };
  },
  methods: {
    handleOnChange (value) {
      const editor = this.editor;
      editor.command.do('fontName', value);
    }
  }
};
</script>

