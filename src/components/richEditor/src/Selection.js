import { UA } from '../../../utils/assist';
import { closest } from 'canknow-core/src/libs';

class Selection {
  constructor (editor) {
    this.editor = editor;
    this._currentRange = null;
  }
  // 获取 range 对象
  getRange () {
    return this._currentRange;
  }
  // 保存选区
  saveRange (_range) {
    if (_range) {
      // 保存已有选区
      this._currentRange = _range;
      return;
    }
    // 获取当前的选区
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return;
    }
    const range = selection.getRangeAt(0);

    // 判断选区内容是否在编辑内容之内
    const containerElement = this.getSelectionContainerElement(range);
    if (!containerElement) {
      return;
    }
    // 判断选区内容是否在不可编辑区域之内
    if (containerElement.getAttribute('contenteditable') === 'false' || closest('[contenteditable=false]', containerElement)) {
      return;
    }
    const editor = this.editor.$refs.editor;
    if (editor.contains(containerElement)) {
      // 是编辑内容之内的
      this._currentRange = range;
    }
  }
  // 折叠选区
  collapseRange (toStart) {
    if (toStart == null) {
      // 默认为 false
      toStart = false;
    }
    const range = this._currentRange;
    if (range) {
      range.collapse(toStart);
    }
  }
  // 选中区域的文字
  getSelectionText () {
    const range = this._currentRange;
    if (range) {
      return this._currentRange.toString();
    }
    else {
      return '';
    }
  }
  getSelectionContainerElement (range) {
    range = range || this._currentRange;
    let element;
    if (range) {
      element = range.commonAncestorContainer;
      return element.nodeType === 1 ? element : element.parentNode;
    }
  }
  getSelectionStartElement (range) {
    range = range || this._currentRange;
    let element;
    if (range) {
      element = range.startContainer;
      return element.nodeType === 1 ? element : element.parentNode;
    }
  }
  getSelectionEndElement (range) {
    range = range || this._currentRange;
    let element;
    if (range) {
      element = range.endContainer;
      return element.nodeType === 1 ? element : element.parentNode;
    }
  }
  // 选区是否为空
  isSelectionEmpty () {
    const range = this._currentRange;
    if (range && range.startContainer) {
      if (range.startContainer === range.endContainer) {
        if (range.startOffset === range.endOffset) {
          return true;
        }
      }
    }
    return false;
  }
  // 恢复选区
  restoreSelection () {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(this._currentRange);
  }
  // 创建一个空白（即 &#8203 字符）选区
  createEmptyRange () {
    const editor = this.editor;
    const range = this.getRange();
    let element;

    if (!range) {
      // 当前无 range
      return;
    }
    if (!this.isSelectionEmpty()) {
      // 当前选区必须没有内容才可以
      return;
    }

    try {
      // 目前只支持 webkit 内核
      if (UA.isWebkit()) {
        // 插入 &#8203
        editor.command.do('insertHTML', '&#8203;');
        // 修改 offset 位置
        range.setEnd(range.endContainer, range.endOffset + 1);
        // 存储
        this.saveRange(range);
      }
      else {
        element = document.createElement('strong');
        element.innerText = '&#8203;';
        editor.command.do('insertElement', element);
        this.createRangeByElement(element, true);
      }
    }
    catch (ex) {
      // 部分情况下会报错，兼容一下
    }
  }
  // 根据 $Elem 设置选区
  createRangeByElement (element, toStart, isContent) {
    // toStart - true 开始位置，false 结束位置
    // isContent - 是否选中Elem的内容
    if (!element) {
      return;
    }
    const range = document.createRange();

    if (isContent) {
      range.selectNodeContents(element);
    }
    else {
      range.selectNode(element);
    }
    if (typeof toStart === 'boolean') {
      range.collapse(toStart);
    }
    // 存储 range
    this.saveRange(range);
  }
}
export default Selection;
