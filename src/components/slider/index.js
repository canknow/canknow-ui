import Slider from './src/Slider';
import SliderButton from './src/SliderButton';

/* istanbul ignore next */
Slider.install = function(Vue) {
  Vue.component(Slider.name, Slider);
  Vue.component(SliderButton.name, SliderButton);
};

export default Slider;