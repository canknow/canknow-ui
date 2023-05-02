<template>
  <transition name="zoom-in-top" @after-leave="$emit('doDestroy')">
    <div
      v-show="visible"
      class="c-picker-panel date-range-picker c-popper"
      :class="[{
        'has-sidebar': $slots.sidebar || shortcuts
      }, popperClass]">
      <div class="c-picker-panel-body-wrapper">
        <slot name="sidebar" class="c-picker-panel-sidebar"></slot>
        <div class="c-picker-panel-sidebar" v-if="shortcuts">
          <button
            type="button"
            class="c-picker-panel-shortcut"
            v-for="(shortcut, key) in shortcuts"
            :key="key"
            @click="handleShortcutClick(shortcut)">{{shortcut.text}}</button>
        </div>
        <div class="c-picker-panel-body">
          <div class="c-picker-panel-content c-date-range-picker-content left">
            <div class="c-date-range-picker-header">
              <c-button
                type="icon"
                @click="leftPrevYear"
                size="small"
                icon="first"
                class="c-picker-panel-icon-button"></c-button>
              <c-button
                type="icon"
                v-if="unlinkPanels"
                @click="leftNextYear"
                size="small"
                :disabled="!enableYearArrow"
                icon="left"
                :class="{ 'disabled': !enableYearArrow }"
                class="c-picker-panel-icon-button"></c-button>
              <div>{{ leftLabel }}</div>
            </div>
            <month-table
              selection-mode="range"
              :date="leftDate"
              :default-value="defaultValue"
              :min-date="minDate"
              :max-date="maxDate"
              :range-state="rangeState"
              :disabled-date="disabledDate"
              @changerange="handleChangeRange"
              @pick="handleRangePick">
            </month-table>
          </div>
          <div class="c-picker-panel-content c-date-range-picker-content right">
            <div class="c-date-range-picker-header">
              <div>{{ rightLabel }}</div>
              <c-button
                      type="icon"
                      v-if="unlinkPanels"
                      @click="rightPrevYear"
                      size="small"
                      :disabled="!enableYearArrow"
                      icon="next"
                      :class="{ 'disabled': !enableYearArrow }"
                      class="c-picker-panel-icon-button"></c-button>
              <c-button
                      type="icon"
                      @click="rightNextYear"
                      size="small"
                      icon="next"
                      class="c-picker-panel-icon-button"></c-button>
            </div>
            <month-table
              selection-mode="range"
              :date="rightDate"
              :default-value="defaultValue"
              :min-date="minDate"
              :max-date="maxDate"
              :range-state="rangeState"
              :disabled-date="disabledDate"
              @changerange="handleChangeRange"
              @pick="handleRangePick">
            </month-table>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import {
  isDate,
  modifyWithTimeString,
  prevYear,
  nextYear,
  nextMonth
} from '../../../../utils/date-util';
import Clickoutside from 'canknow-ui-core/src/directives/clickoutside';
import Locale from '../../../../mixins/locale';
import MonthTable from '../basic/month-table';

const calcDefaultValue = (defaultValue) => {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  }
  else if (defaultValue) {
    return [new Date(defaultValue), nextMonth(new Date(defaultValue))];
  }
  else {
    return [new Date(), nextMonth(new Date())];
  }
};
export default {
  mixins: [Locale],
  directives: { Clickoutside },
  computed: {
    btnDisabled() {
      return !(this.minDate && this.maxDate && !this.selecting && this.isValidValue([this.minDate, this.maxDate]));
    },
    leftLabel() {
      return this.leftDate.getFullYear() + ' ' + this.t('core.datepicker.year');
    },

    rightLabel() {
      return this.rightDate.getFullYear() + ' ' + this.t('core.datepicker.year');
    },

    leftYear() {
      return this.leftDate.getFullYear();
    },

    rightYear() {
      return this.rightDate.getFullYear() === this.leftDate.getFullYear() ? this.leftDate.getFullYear() + 1 : this.rightDate.getFullYear();
    },

    enableYearArrow() {
      return this.unlinkPanels && this.rightYear > this.leftYear + 1;
    }
  },
  data() {
    return {
      popperClass: '',
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: '',
      maxDate: '',
      leftDate: new Date(),
      rightDate: nextYear(new Date()),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      shortcuts: '',
      visible: '',
      disabledDate: '',
      format: '',
      arrowControl: false,
      unlinkPanels: false
    };
  },
  watch: {
    value(newVal) {
      if (!newVal) {
        this.minDate = null;
        this.maxDate = null;
      }
      else if (Array.isArray(newVal)) {
        this.minDate = isDate(newVal[0]) ? new Date(newVal[0]) : null;
        this.maxDate = isDate(newVal[1]) ? new Date(newVal[1]) : null;
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            const minDateYear = this.minDate.getFullYear();
            const maxDateYear = this.maxDate.getFullYear();
            this.rightDate = minDateYear === maxDateYear
              ? nextYear(this.maxDate)
              : this.maxDate;
          }
          else {
            this.rightDate = nextYear(this.leftDate);
          }
        }
        else {
          this.leftDate = calcDefaultValue(this.defaultValue)[0];
          this.rightDate = nextYear(this.leftDate);
        }
      }
    },

    defaultValue(value) {
      if (!Array.isArray(this.value)) {
        const [left, right] = calcDefaultValue(value);
        this.leftDate = left;
        this.rightDate = value && value[1] && left.getFullYear() !== right.getFullYear() && this.unlinkPanels
          ? right
          : nextYear(this.leftDate);
      }
    }
  },
  methods: {
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = calcDefaultValue(this.defaultValue)[0];
      this.rightDate = nextYear(this.leftDate);
      this.$emit('pick', null);
    },

    handleChangeRange(value) {
      this.minDate = value.minDate;
      this.maxDate = value.maxDate;
      this.rangeState = value.rangeState;
    },

    handleRangePick(value, close = true) {
      const defaultTime = this.defaultTime || [];
      const minDate = modifyWithTimeString(value.minDate, defaultTime[0]);
      const maxDate = modifyWithTimeString(value.maxDate, defaultTime[1]);
      if (this.maxDate === maxDate && this.minDate === minDate) {
        return;
      }
      this.onPick && this.onPick(value);
      this.maxDate = maxDate;
      this.minDate = minDate;

      // workaround for https://github.com/ElemeFE/element/issues/7539, should remove this block when we don't have to care about Chromium 55 - 57
      setTimeout(() => {
        this.maxDate = maxDate;
        this.minDate = minDate;
      }, 10);
      if (!close) return;
      this.handleConfirm();
    },

    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },

    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear() {
      this.leftDate = prevYear(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = prevYear(this.rightDate);
      }
    },

    rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = nextYear(this.leftDate);
      }
      this.rightDate = nextYear(this.rightDate);
    },

    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear() {
      this.leftDate = nextYear(this.leftDate);
    },

    rightPrevYear() {
      this.rightDate = prevYear(this.rightDate);
    },

    handleConfirm(visible = false) {
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit('pick', [this.minDate, this.maxDate], visible);
      }
    },

    isValidValue(value) {
      return Array.isArray(value) &&
          value && value[0] && value[1] &&
          isDate(value[0]) && isDate(value[1]) &&
          value[0].getTime() <= value[1].getTime() && (
        typeof this.disabledDate === 'function'
          ? !this.disabledDate(value[0]) && !this.disabledDate(value[1])
          : true
      );
    },

    resetView() {
      // NOTE: this is a hack to reset {min, max}Date on picker open.
      // TODO: correct way of doing so is to refactor {min, max}Date to be dependent on value and internal selection state
      //       an alternative would be resetView whenever picker becomes visible, should also investigate date-panel's resetView
      this.minDate = this.value && isDate(this.value[0]) ? new Date(this.value[0]) : null;
      this.maxDate = this.value && isDate(this.value[0]) ? new Date(this.value[1]) : null;
    }
  },
  components: { MonthTable }
};
</script>
