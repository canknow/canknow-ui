export * from 'canknow-ui-core/src/utils/assist';

export const UA = {
  _ua: navigator.userAgent,
  // 是否 webkit
  isWebkit () {
    const reg = /webkit/i;
    return reg.test(this._ua);
  },
  // 是否 IE
  isIE () {
    return 'ActiveXObject' in window;
  }
};

function firstUpperCase(str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}
export { firstUpperCase };

export function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}
