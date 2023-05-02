import Store from './index';
import { debounce } from 'canknow-core/src/libs';

export function createStore(table, initialState = {}) {
  if (!table) {
    throw new Error('Table is required.');
  }

  const store = new Store();
  store.table = table;
  // fix https://github.com/ElemeFE/element/issues/14075
  // related pr https://github.com/ElemeFE/element/pull/14146
  store.toggleAllSelection = debounce(store._toggleAllSelection, 10);
  Object.keys(initialState).forEach(key => {
    store.states[key] = initialState[key];
  });
  return store;
}

export function mapStates(mapper) {
  const result = {};
  Object.keys(mapper).forEach(key => {
    const value = mapper[key];
    let fn;
    if (typeof value === 'string') {
      fn = function() {
        return this.store.states[value];
      };
    }
    else if (typeof value === 'function') {
      fn = function() {
        return value.call(this, this.store.states);
      };
    }
    else {
      console.error('invalid value type');
    }
    if (fn) {
      result[key] = fn;
    }
  });
  return result;
}
