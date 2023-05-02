import Browser from './src/Browser';

/* istanbul ignore next */
Browser.install = function(Vue) {
  Vue.component(Browser.name, Browser);
};

export default Browser;
