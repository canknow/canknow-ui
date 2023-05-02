import Descriptions from './src/Descriptions';
import DescriptionsItem from './src/DescriptionsItem';

/* istanbul ignore next */
Descriptions.install = function(Vue) {
  Vue.component(Descriptions.name, Descriptions);
  Vue.component(DescriptionsItem.name, DescriptionsItem);
};

export default Descriptions;
