import defaultLang from './lang/zh-CN';
import Vue from 'vue';
import Format from './format';

const format = Format(Vue);
let lang = defaultLang;

let i18nHandler = function() {
  const vueI18n = Vue.prototype.$t;

  if (typeof vueI18n === 'function' && !!Vue.locale) {
    return vueI18n.apply(this, arguments);
  }
};

export const t = function(path, options) {
  let value = i18nHandler.apply(this, arguments);

  if (value !== null && value !== undefined) {
    return value;
  }

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property] || property;
    if (i === j - 1) {
      return format(value, options);
    }

    if (!value) {
      return '';
    }
    current = value;
  }
  return '';
};

// the default lang data
export const use = function(l) {
  lang = l || lang;
};

// the localize function
export const i18n = function(fn) {
  i18nHandler = fn || i18nHandler;
};
export default { use, t, i18n };
