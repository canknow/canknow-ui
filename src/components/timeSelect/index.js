import TimePicker from '../datePicker/src/picker/time-picker';
import TimeSelect from '../datePicker/src/picker/time-select';

TimeSelect.install = function(Vue) {
  Vue.component(TimePicker.name, TimePicker);
  Vue.component(TimeSelect.name, TimeSelect);
};
export default TimeSelect;