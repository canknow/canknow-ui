<template>
    <div class="c-rich-editor-toolbar-item" ref="toolbarItem" :class="{ active: active}">
        <c-color-picker block v-model="selectedValue" @change="handleOnChange"></c-color-picker>
    </div>
</template>

<script>
import Locale from '../../../../mixins/locale';

export default {
  name: 'Color',
  mixins: [ Locale ],
  props: {
    editor: {
      type: Object
    }
  },
  data () {
    return {
      selectedValue: null,
      active: false
    };
  },
  methods: {
    handleOnChange (value) {
      const editor = this.editor;
      editor.command.do('ForeColor', value);
    }
  }
};
</script>

