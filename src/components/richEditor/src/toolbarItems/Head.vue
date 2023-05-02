<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-select class="width-em10" v-model="selectedValue" @change="handleOnChange" :placeholder="t('core.richEditor.toolbar.head.select.placeHolder')">
            <c-option v-for="head in heads" :key="head.name" :value="head.value">{{t('core.richEditor.toolbar.head.' + head.name)}}</c-option>
        </c-select>
    </div>
</template>

<script>
import Locale from '../../../../mixins/locale';

const heads = [
  {
    name: 'h1',
    value: '<h1>'
  },
  {
    name: 'h2',
    value: '<h2>'
  },
  {
    name: 'h3',
    value: '<h3>'
  },
  {
    name: 'h4',
    value: '<h4>'
  },
  {
    name: 'h5',
    value: '<h5>'
  },
  {
    name: 'h6',
    value: '<h6>'
  },
  {
    name: 'p',
    value: '<p>'
  }
];

export default {
  name: 'Head',
  mixins: [ Locale ],
  props: {
    editor: {
      type: Object
    }
  },
  data () {
    return {
      selectedValue: null,
      heads,
      active: false
    };
  },
  methods: {
    handleOnChange (value) {
      const editor = this.editor;
      const selectionElement = editor.selection.getSelectionContainerElement();
      if (editor.$refs.editor === selectionElement) {
        // 不能选中多行来设置标题，否则会出现问题
        // 例如选中的是 <p>xxx</p><p>yyy</p> 来设置标题，设置之后会成为 <h1>xxx<br>yyy</h1> 不符合预期
        return;
      }
      editor.command.do('formatBlock', value);
    },
    tryChangeActive (e) {
      const editor = this.editor;
      const commandValue = editor.command.queryCommandValue('formatBlock');
      const item = heads.find((head) => {
        return head.name === commandValue;
      });
      if (item) {
        this.selectedValue = item.value;
        this.active = true;
      }
      else {
        this.selectedValue = null;
        this.active = false;
      }
    }
  }
};
</script>

