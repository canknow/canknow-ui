class Command {
  constructor (editor) {
    this.editor = editor;
  }
  // 执行命令
  do (name, value) {
    const editor = this.editor;

    // 使用 styleWithCSS
    if (!editor._useStyleWithCSS) {
      document.execCommand('styleWithCSS', null, true);
      editor._useStyleWithCSS = true;
    }

    // 如果无选区，忽略
    if (!editor.selection.getRange()) {
      return;
    }

    // 恢复选取
    editor.selection.restoreSelection();

    // 执行
    const _name = '_' + name;
    if (this[_name]) {
      // 有自定义事件
      this[_name](value);
    }
    else {
      // 默认 command
      this._execCommand(name, value);
    }

    // 修改菜单状态
    editor.$refs.toolbar.changeActive();

    // 最后，恢复选取保证光标在原来的位置闪烁
    editor.selection.saveRange();
    editor.selection.restoreSelection();

    // 触发 onchange
    editor.change && editor.change();
  }
  // 自定义 insertHTML 事件
  _insertHTML (html) {
    const editor = this.editor;
    const range = editor.selection.getRange();

    if (this.queryCommandSupported('insertHTML')) {
      // W3C
      this._execCommand('insertHTML', html);
    }
    else if (range.insertNode) {
      // IE
      range.deleteContents();
      const container = document.createElement('div');
      container.innerHTML = html;
      range.insertNode(container);
    }
    else if (range.pasteHTML) {
      // IE <= 10
      range.pasteHTML(html);
    }
  }
  // 插入 elem
  _insertElement (element) {
    const editor = this.editor;
    const range = editor.selection.getRange();

    if (range.insertNode) {
      range.deleteContents();
      range.insertNode(element);
    }
  }
  // 封装 execCommand
  _execCommand (name, value) {
    document.execCommand(name, false, value);
  }
  // 封装 document.queryCommandValue
  queryCommandValue (name) {
    return document.queryCommandValue(name);
  }
  // 封装 document.queryCommandState
  queryCommandState (name) {
    return document.queryCommandState(name);
  }
  // 封装 document.queryCommandSupported
  queryCommandSupported (name) {
    return document.queryCommandSupported(name);
  }
}
export default Command;