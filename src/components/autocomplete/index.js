import Autocomplete from './src/Autocomplete';
import AutocompleteSuggestions from './src/AutocompleteSuggestions';

Autocomplete.install = function(Vue) {
  Vue.component(Autocomplete.name, Autocomplete);
  Vue.component(AutocompleteSuggestions.name, AutocompleteSuggestions);
};

export default Autocomplete;
