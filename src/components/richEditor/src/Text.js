class Text {
  constructor (editor) {
    this.editor = editor;
    this.editorElement = this.editor.$refs.editor;
    this.selectedImage = null;
  }// 初始化
  initialize () {
    // 绑定事件
    this._bindEvent();
  }
  // 清空内容
  clear () {
    this.html('<p><br></p>');
  }
  // 获取 设置 html
  html (value) {
    let html;
    if (value == null) {
      html = this.editorElement.innerHTML;
      // 未选中任何内容的时候点击“加粗”或者“斜体”等按钮，就得需要一个空的占位符 &#8203 ，这里替换掉
      html = html.replace(/\u200b/gm, '');
      return html;
    }
    else {
      this.editorElement.innerHTML = value;
      // 初始化选取，将光标定位到内容尾部
      this.editorElement.initSelection();
    }
  }
  // 获取 设置 text
  text (value) {
    let text;
    if (value == null) {
      text = this.editorElement.innerText;
      // 未选中任何内容的时候点击“加粗”或者“斜体”等按钮，就得需要一个空的占位符 &#8203 ，这里替换掉
      text = text.replace(/\u200b/gm, '');
      return text;
    }
    else {
      this.editorElement.innerHTML = `<p>${value}</p>`;
      // 初始化选取，将光标定位到内容尾部
      this.editorElement.initSelection();
    }
  }
  // 追加内容
  append (html) {
    this.editorElement.appendChild(html);
    // 初始化选取，将光标定位到内容尾部
    this.editorElement.initSelection();
  }
  // 绑定事件
  _bindEvent () {
    // 实时保存选取
    this._saveRangeRealTime();
    // 按回车建时的特殊处理
    this._enterKeyHandle();
    // 清空时保留 <p><br></p>
    this._clearHandle();
    // 粘贴事件（粘贴文字，粘贴图片）
    this._pasteHandle();
    // tab 特殊处理
    this._tabHandle();
    // img 点击
    this._imgHandle();
    // 拖拽事件
    this._dragHandle();
  }
  // 实时保存选取
  _saveRangeRealTime () {
    // 保存当前的选区
    const saveRange = () => {
      // 随时保存选区
      this.editor.selection.saveRange();
      // 更新按钮 ative 状态
      this.editor.$refs.toolbar.changeActive();
    };
    // 按键后保存
    this.editorElement.addEventListener('keyup', saveRange);
    this.editorElement.addEventListener('mousedown', () => {
      // mousedown 状态下，鼠标滑动到编辑区域外面，也需要保存选区
      this.editorElement.addEventListener('mouseleave', saveRange);
    });
    this.editorElement.addEventListener('mouseup', () => {
      saveRange();
      // 在编辑器区域之内完成点击，取消鼠标滑动到编辑区外面的事件
      this.editorElement.removeEventListener('mouseleave', saveRange);
    });
  }
  _enterKeyHandle () {

  }
  // 清空时保留 <p><br></p>
  _clearHandle () {
    this.editorElement.addEventListener('keydown', e => {
      if (e.keyCode !== 8) {
        return;
      }
      const html = this.editorElement.innerHTML.toLowerCase().trim();
      if (html === '<p><br></p>') {
        // 最后剩下一个空行，就不再删除了
        e.preventDefault();
        return;
      }
    });
    this.editorElement.addEventListener('keyup', e => {
      if (e.keyCode !== 8) {
        return;
      }
      const html = this.editorElement.innerHTML.toLowerCase().trim();

      // firefox 时用 html === '<br>' 判断，其他用 !html 判断
      if (!html || html === '<br>') {
        // 内容空了
        const p = document.createElement('p');
        p.innerHTML = '<p><br/></p>';
        this.editorElement.innerHTML = '';  // 一定要先清空，否则在 firefox 下有问题
        this.editorElement.appendChild(p);
        this.editor.selection.createRangeByElement(p, false, true);
        this.editor.selection.restoreSelection();
      }
    });
  }
  // 粘贴事件（粘贴文字 粘贴图片）
  _pasteHandle () {

  }
  _tabHandle () {

  }
  // img 点击
  _imgHandle () {
    // 为图片增加 selected 样式
    const _this = this;
    this.editorElement.on('click', 'img', function (e) {
      if (this.getAttribute('data-w-e') === '1') {
        // 是表情图片，忽略
        return;
      }
      // 记录当前点击过的图片
      _this.selectedImage = this;

      // 修改选区并 restore ，防止用户此时点击退格键，会删除其他内容
      _this.editor.selection.createRangeByElement(this);
      _this.editor.selection.restoreSelection();
    });

    // 去掉图片的 selected 样式
    this.editorElement.on('click  keyup', e => {
      if (e.target.matches('img')) {
        // 点击的是图片，忽略
        return;
      }
      // 删除记录
      this.selectedImage = null;
    });
  }
  // 拖拽事件
  _dragHandle () {
    // 禁用 document 拖拽事件
    document.on('dragleave drop dragenter dragover', (e) => {
      e.preventDefault();
    });
    this.editorElement.on('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) {
        return;
      }
      this.upload(files);
    });
  }
}
export default Text;