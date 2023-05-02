import BatteryCharge from './src/BatteryCharge';

/* istanbul ignore next */
BatteryCharge.install = function(Vue) {
  Vue.component(BatteryCharge.name, BatteryCharge);
};

export default BatteryCharge;
