import DatePicker from './src/picker/date-picker';
import TimePicker from './src/picker/time-picker';
import TimeSelect from './src/picker/time-select';

DatePicker.install = function(Vue) {
  Vue.component(DatePicker.name, DatePicker);
  Vue.component(TimePicker.name, TimePicker);
  Vue.component(TimeSelect.name, TimeSelect);
};
export default DatePicker;