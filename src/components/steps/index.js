import Steps from './src/Steps.vue';
import Step from './src/Step.vue';

Steps.install = function(Vue) {
  Vue.component(Steps.name, Steps);
  Vue.component(Step.name, Step);
};

export default [Steps, Step];