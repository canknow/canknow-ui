import 'canknow-ui-core/src/index';
import locale from './locale/index';
import container from './container';
import directives from './directives/index';
import filters from './filters/index';
import log from 'canknow-ui-core/src/utils/log';
import components from './components';

const install = function(Vue, options = {
  config: {

  } }) {
  if (install.installed) {
    return;
  }
  Object.assign(container.config, options.config);

  Vue.prototype.$CANKNOW = container;

  locale.use(options.locale);
  locale.i18n(options.i18n);
  Object.keys(components).forEach(key => {
    if (components.hasOwnProperty(key)) {
      const component = components[key];
      if (component instanceof  Array) {
        component[0].install(Vue);
      }
      else {
        component.install(Vue);
      }
    }
  });

  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
  });

  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
  install.installed = true;
  log.pretty('[' + process.env.VUE_APP_NAME + ']' + process.env.VUE_APP_VERSION, process.env.VUE_APP_REPOSITORY);
};

const API = {
  version: process.env.VUE_APP_VERSION,
  ...components,
  locale: locale.use,
  i18n: locale.i18n,
  t: locale.t,
  log,
  install,
};

export default {
  ...container,
  ...API
};
