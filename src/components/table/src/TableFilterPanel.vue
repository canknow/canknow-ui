<template>
  <transition name="zoom-in-top">
    <div
      class="c-table-filter"
      v-if="multiple"
      v-clickoutside="handleOutsideClick"
      v-show="showPopper">
      <div class="c-table-filter-content">
        <scrollbar wrap-class="c-table-filter-wrap">
          <c-checkbox-group class="c-table-filter-checkbox-group" v-model="filteredValue">
            <c-checkbox
              v-for="filter in filters"
              :key="filter.value"
              :value="filter.value">{{ filter.text }}</c-checkbox>
          </c-checkbox-group>
        </scrollbar>
      </div>
      <div class="c-table-filter-bottom">
        <button @click="handleConfirm"
          :class="{ 'disabled': filteredValue.length === 0 }"
          :disabled="filteredValue.length === 0">{{ t('core.table.confirmFilter') }}</button>
        <button @click="handleReset">{{ t('core.table.resetFilter') }}</button>
      </div>
    </div>
    <div
      class="c-table-filter"
      v-else
      v-clickoutside="handleOutsideClick"
      v-show="showPopper">
      <ul class="c-table-filter-list">
        <li class="c-table-filter-list-item"
            :class="{ 'active': filterValue === undefined || filterValue === null }"
            @click="handleSelect(null)">{{ t('el.table.clearFilter') }}</li>
        <li class="c-table-filter-list-item"
            v-for="filter in filters"
            :label="filter.value"
            :key="filter.value"
            :class="{ 'active': isActive(filter) }"
            @click="handleSelect(filter.value)" >{{ filter.text }}</li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popper from './../../../utils/vue-popper';
import { PopupManager } from './../../../utils/popup';
import Locale from './../../../mixins/locale';
import Clickoutside from 'canknow-ui-core/src/directives/clickoutside';
import Dropdown from './dropdown';
import Checkbox from './../../checkbox';
import CheckboxGroup from './../../checkboxGroup';
import Scrollbar from './../../scrollbar';

export default {
  name: 'CTableFilterPanel',
  mixins: [Popper, Locale],
  directives: {
    Clickoutside
  },
  components: {
    Checkbox,
    CheckboxGroup,
    Scrollbar
  },
  props: {
    placement: {
      type: String,
      default: 'bottom-end'
    }
  },
  methods: {
    isActive(filter) {
      return filter.value === this.filterValue;
    },

    handleOutsideClick() {
      setTimeout(() => {
        this.showPopper = false;
      }, 16);
    },

    handleConfirm() {
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },

    handleReset() {
      this.filteredValue = [];
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },

    handleSelect(filterValue) {
      this.filterValue = filterValue;

      if ((typeof filterValue !== 'undefined') && (filterValue !== null)) {
        this.confirmFilter(this.filteredValue);
      }
      else {
        this.confirmFilter([]);
      }

      this.handleOutsideClick();
    },

    confirmFilter(filteredValue) {
      this.table.store.commit('filterChange', {
        column: this.column,
        values: filteredValue
      });
      this.table.store.updateAllSelected();
    }
  },

  data() {
    return {
      table: null,
      cell: null,
      column: null
    };
  },

  computed: {
    filters() {
      return this.column && this.column.filters;
    },

    filterValue: {
      get() {
        return (this.column.filteredValue || [])[0];
      },
      set(value) {
        if (this.filteredValue) {
          if ((typeof value !== 'undefined') && (value !== null)) {
            this.filteredValue.splice(0, 1, value);
          }
          else {
            this.filteredValue.splice(0, 1);
          }
        }
      }
    },

    filteredValue: {
      get() {
        if (this.column) {
          return this.column.filteredValue || [];
        }
        return [];
      },
      set(value) {
        if (this.column) {
          this.column.filteredValue = value;
        }
      }
    },

    multiple() {
      if (this.column) {
        return this.column.filterMultiple;
      }
      return true;
    }
  },

  mounted() {
    this.popperElement = this.$el;
    this.referenceElement = this.cell;
    this.table.bodyWrapper.addEventListener('scroll', () => {
      this.updatePopper();
    });

    this.$watch('showPopper', (value) => {
      if (this.column) {
        this.column.filterOpened = value;
      }

      if (value) {
        Dropdown.open(this);
      }
      else {
        Dropdown.close(this);
      }
    });
  },
  watch: {
    showPopper(value) {
      if (value === true && parseInt(this.popperJS.popper.style.zIndex, 10) < PopupManager.zIndex) {
        this.popperJS.popper.style.zIndex = PopupManager.nextZIndex();
      }
    }
  }
};
</script>
