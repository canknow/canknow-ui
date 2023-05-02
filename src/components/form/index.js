import Form from './src/Form';
import FormItem from './src/FormItem';

Form.install = function(Vue) {
  Vue.component(Form.name, Form);
  Vue.component('iForm', Form);
  Vue.component(FormItem.name, FormItem);
};
export default [Form, FormItem];