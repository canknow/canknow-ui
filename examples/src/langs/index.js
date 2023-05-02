import Vue from 'vue';
import VueI18n from 'vue-i18n';
import canknowZhCN from '../../../src/locale/lang/zh-CN';
import canknowEn from '../../../src/locale/lang/en-US';

import zhCN from './zh-CN';
import enUS from './en-US';

// 读取系统/存储的语言集标识
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: lang,    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': Object.assign({}, canknowZhCN, zhCN),
    'en-US': Object.assign({}, canknowEn, enUS)
  }
});

export default i18n;
