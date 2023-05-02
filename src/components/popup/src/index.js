import Popup from './popupInstance';

let popupInstance;

function getPopupInstance (render = undefined, className) {
  popupInstance = popupInstance || Popup.newInstance({
    closable: false,
    className: className,
    maskClosable: false,
    render: render
  });
  return popupInstance;
}

function popup (options) {
  const render = ('render' in options) ? options.render : undefined;
  let instance  = getPopupInstance(render, options.className);

  options.onRemove = function () {
    popupInstance = null;
  };
  instance.show(options);
}

Popup.popup = function (props = {}) {
  props.showCancel = true;
  return popup(props);
};

Popup.remove = function () {

  if (!popupInstance) {   // at loading status, remove after Cancel
    return false;
  }
  const instance = getPopupInstance();
  instance.remove();
};

export default Popup;