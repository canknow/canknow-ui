import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import componentFrame from '../../src';
import i18n from './langs';
import directives from './directives';
import components from './views/components';
import hljs from 'highlight.js';
import Icon from 'canknow-icon/src/component/icon/index';

Vue.use(Icon);
Vue.use(VueRouter);
Vue.use(componentFrame, {
  i18n: (key, value) => i18n.t(key, value),
  config: {
    baseUrl: ''
  }
});

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

Object.keys((components)).forEach(key => {
  Vue.component(key, components[key]);
});

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  document.title = 'Canknow';
});

// 开启debug模式
Vue.config.debug = true;

new Vue({
  el: '#app',
  i18n,
  router: router,
  render: h => h(App)
});
