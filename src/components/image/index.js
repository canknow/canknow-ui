import Image from './src/Image';

/* istanbul ignore next */
Image.install = function(Vue) {
  Vue.component(Image.name, Image);
};

export default Image;
