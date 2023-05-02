import Vue from 'vue';
import { addClass, removeClass } from 'canknow-core/src/libs';

let hasMaskElement = false;
let hasInitZIndex = false;
let zIndex = 2000;

const getMaskElement = function() {
  let maskElement = PopupManager.maskElement;
  if (maskElement) {
    hasMaskElement = true;
  }
  else {
    hasMaskElement = false;
    maskElement = document.createElement('div');
    PopupManager.maskElement = maskElement;

    maskElement.addEventListener('touchmove', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });

    maskElement.addEventListener('click', function() {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return maskElement;
};

const instances = {};

const PopupManager = {
  modalFade: true,
  getInstance: function(id) {
    return instances[id];
  },
  register: function(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister: function(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex: function() {
    return PopupManager.zIndex++;
  },
  modalStack: [],
  doOnModalClick: function() {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;

    const instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },
  openModal: function(id, zIndex, element, modalClass, modalFade) {
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;

    const modalStack = this.modalStack;

    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }
    const maskElement = getMaskElement();

    addClass(maskElement, 'v-modal');
    if (this.modalFade && !hasMaskElement) {
      addClass(maskElement, 'v-modal-enter');
    }
    if (modalClass) {
      let classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(item => addClass(maskElement, item));
    }
    setTimeout(() => {
      removeClass(maskElement, 'v-modal-enter');
    }, 200);

    if (element && element.parentNode && element.parentNode.nodeType !== 11) {
      element.parentNode.appendChild(maskElement);
    }
    else {
      document.body.appendChild(maskElement);
    }

    if (zIndex) {
      maskElement.style.zIndex = zIndex;
    }
    maskElement.tabIndex = 0;
    maskElement.style.display = '';

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
  },
  closeModal: function(id) {
    const modalStack = this.modalStack;
    const maskElement = getMaskElement();

    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          let classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(item => removeClass(maskElement, item));
        }

        modalStack.pop();
        if (modalStack.length > 0) {
          maskElement.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      }
      else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(maskElement, 'v-modal-leave');
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (maskElement.parentNode) maskElement.parentNode.removeChild(maskElement);
          maskElement.style.display = 'none';
          PopupManager.maskElement = undefined;
        }
        removeClass(maskElement, 'v-modal-leave');
      }, 200);
    }
  }
};

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      zIndex = (Vue.prototype.$CANKNOW || {}).zIndex || zIndex;
      hasInitZIndex = true;
    }
    return zIndex;
  },
  set(value) {
    zIndex = value;
  }
});

const getTopPopup = function() {
  if (PopupManager.modalStack.length > 0) {
    const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) return;
    return PopupManager.getInstance(topPopup.id);
  }
};

// handle `esc` key when the popup is shown
window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
    const topPopup = getTopPopup();

    if (topPopup && topPopup.closeOnPressEscape) {
      topPopup.handleClose ? topPopup.handleClose() : (topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close());
    }
  }
});

export default PopupManager;
