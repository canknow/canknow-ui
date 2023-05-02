import Select from './src/Select';
import Option from './src/Option';
import OptionGroup from './src/OptionGroup';

/* istanbul ignore next */
Select.install = function(Vue) {
  Vue.component(Select.name, Select);
  Vue.component('iSelect', Select);
  Vue.component(Option.name, Option);
  Vue.component('iOption', Option);
  Vue.component(OptionGroup.name, OptionGroup);
  Vue.component('iOptionGroup', OptionGroup);
};

export default [Select, Option];