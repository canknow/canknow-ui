import { ResizeSensor } from 'css-element-queries';
import { debounce } from 'canknow-core/src/libs';
let delay = 150;

function getDelay(modifiers) {
  if (!modifiers) {
    return delay;
  }
  const keys = Object.keys(modifiers);
  return (keys.length) ? Number(keys[0]) : delay;
}

export default {
  inserted(el, { value, arg, modifiers }) {
    let delay = delay;
    if (!value) {
      console.warn('method or v-resize is not implemented as to $el');
    }
    let callBack = () => value(el);
    switch (arg) {
      case 'debounce':
        callBack = debounce(() => value(el), getDelay(modifiers));
        break;
      case 'throttle':
        delay = getDelay(modifiers);
        callBack = debounce(() => value(el), delay, { leading: true, trailing: true, maxWait: delay });
        break;
    }
    new ResizeSensor(el, callBack);
  }
};
