<template>
    <div class="c-rich-editor">
        <Toolbar ref="toolbar" :editor="editor"></Toolbar>
        <div class="c-rich-editor-editor-wrapper">
            <div ref="editor" class="c-rich-editor-editor" :style="styles" contenteditable="true"></div>
        </div>
    </div>
</template>

<script>
import defaultConfigs from './defaultConfigs';
import Selection from './Selection';
import Text from './Text';
import Toolbar from './Toolbar';
import Command from './Command';
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  name: 'CRichEditor',
  mixins: [Emitter],
  components: {
    Toolbar
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Object,
      default () {
        return {

        };
      }
    }
  },
  computed: {
    styles () {
      const styles = {

      };
      styles.height = this.configs.height + 'px';
      return styles;
    },
    editor () {
      return this;
    }
  },
  watch: {
    value (value) {
      if (value !== this.currentValue) {
        this.currentValue = value;
        this.$refs.editor.innerHTML = value;
      }
    }
  },
  data () {
    return {
      configs: {
        height: null,
        onchange: () => {

        }
      },
      currentValue: null,
      text: null,
      selection: null,
      command: null
    };
  },
  methods: {
    // 封装 command
    initCommand: function () {
      this.command = new Command(this);
    },
    onChange (value) {
      this.currentValue  = value;
      this.$emit('input', value);
      this.dispatch('CFormItem', 'form.change', value);
    },
    // 封装 selection range API
    initSelectionAPI () {
      this.selection = new Selection(this);
    },
    initialize () {
      // 初始化 DOM
      this.initializeDom();
      // 封装 command API
      this.initCommand();
      // 封装 selection range API
      this.initSelectionAPI();
      // 添加 text
      this.initializeText();
      // 初始化选区，将光标定位到内容尾部
      this.initSelection(true);
      this.bindEvent();
    },
    bindEvent () {
      // -------- 绑定 onchange 事件 --------
      let onChangeTimeoutId = 0;
      let beforeChangeHtml = this.text.html();
      const configs = this.configs;

      // onchange 触发延迟时间
      let onchangeTimeout = configs.onchangeTimeout;
      onchangeTimeout = parseInt(onchangeTimeout, 10);
      if (!onchangeTimeout || onchangeTimeout <= 0) {
        onchangeTimeout = 200;
      }
      // 触发 change 的有三个场景：
      // 1. $textContainerElem.on('click keyup')
      // 2. $toolbarElem.on('click')
      // 3. editor.cmd.do()
      this.change = function () {
        // 判断是否有变化
        let currentHtml = this.text.html();

        if (currentHtml.length === beforeChangeHtml.length) {
          // 需要比较每一个字符
          if (currentHtml === beforeChangeHtml) {
            return;
          }
        }

        // 执行，使用节流
        if (onChangeTimeoutId) {
          clearTimeout(onChangeTimeoutId);
        }
        onChangeTimeoutId = setTimeout(() => {
          this.onChange(currentHtml);
          beforeChangeHtml = currentHtml;
        }, onchangeTimeout);
      };

      // -------- 绑定 onblur 事件 --------
      const onblur = configs.onblur;
      if (onblur && typeof onblur === 'function') {
        this.onblur = function () {
          const currentHtml = this.text.html();
          onblur(currentHtml);
        };
      }

      // -------- 绑定 onfocus 事件 --------
      const onfocus = configs.onfocus;
      if (onfocus && typeof onfocus === 'function') {
        this.onfocus = function () {
          onfocus();
        };
      }
    },
    initializeDom () {
      if (this.value) {
        this.$refs.editor.innerHTML = this.value;
      }
      // 记录输入法的开始和结束
      let compositionEnd = true;
      this.$refs.editor.addEventListener('compositionstart', () => {
        // 输入法开始输入
        compositionEnd = false;
      });
      this.$refs.editor.addEventListener('compositionend', () => {
        // 输入法结束输入
        compositionEnd = true;
      });

      // 绑定 onchange
      this.$refs.editor.addEventListener('keyup', () => {
        // 输入法结束才出发 onchange
        compositionEnd && this.change &&  this.change();
      });
    },
    initializeText () {
      this.text = new Text(this);
      this.text.initialize();
    },
    // 初始化选区，将光标定位到内容尾部
    initSelection () {
      const editor = this.$refs.editor;
      const childNodes = editor.childNodes;
      if (!childNodes.length) {
        // 如果编辑器区域无内容，添加一个空行，重新设置选区
        editor.innerHTML = '<p><br></p>';
        this.initSelection();
        return;
      }
      const lastNode = editor.lastChild;
      this.selection.createRangeByElement(lastNode, false, true);
      this.selection.restoreSelection();
    }
  },
  created() {
    this.configs = Object.assign(this.configs, defaultConfigs, this.options);
  },
  mounted () {
    this.initialize();
  }
};
</script>
