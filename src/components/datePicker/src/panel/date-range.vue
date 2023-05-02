<template>
  <transition name="zoom-in-top" @after-leave="$emit('doDestroy')">
    <div
      v-show="visible"
      class="c-picker-panel c-date-range-picker c-popper"
      :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime
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
          <div class="c-date-range-picker-time-header" v-if="showTime">
            <span class="c-date-range-picker-editors-wrap">
              <span class="c-date-range-picker-time-picker-wrap">
                <c-input
                  :disabled="rangeState.selecting"
                  ref="minInput"
                  :placeholder="t('core.datepicker.startDate')"
                  class="c-date-range-picker-editor"
                  :value="minVisibleDate"
                  @input="value => handleDateInput(value, 'min')"
                  @change="value => handleDateChange(value, 'min')" />
              </span>
              <span class="c-date-range-picker-time-picker-wrap" v-clickoutside="handleMinTimeClose">
                <c-input
                  class="c-date-range-picker-editor"
                  :disabled="rangeState.selecting"
                  :placeholder="t('core.datepicker.startTime')"
                  :value="minVisibleTime"
                  @focus="minTimePickerVisible = true"
                  @input="value => handleTimeInput(value, 'min')"
                  @change="value => handleTimeChange(value, 'min')" />
                <time-picker
                  ref="minTimePicker"
                  @pick="handleMinTimePick"
                  :time-arrow-control="arrowControl"
                  :visible="minTimePickerVisible"
                  @mounted="$refs.minTimePicker.format=timeFormat">
                </time-picker>
              </span>
            </span>
            <icon name="right" class="icon-arrow-right"></icon>
            <span class="c-date-range-picker-editors-wrap right">
              <span class="c-date-range-picker-time-picker-wrap">
                <c-input
                  class="c-date-range-picker-editor"
                  :disabled="rangeState.selecting"
                  :placeholder="t('core.datepicker.endDate')"
                  :value="maxVisibleDate"
                  :readonly="!minDate"
                  @input="value => handleDateInput(value, 'max')"
                  @change="value => handleDateChange(value, 'max')" />
              </span>
              <span class="c-date-range-picker-time-picker-wrap" v-clickoutside="handleMaxTimeClose">
                <c-input
                  class="c-date-range-picker-editor"
                  :disabled="rangeState.selecting"
                  :placeholder="t('core.datepicker.endTime')"
                  :value="maxVisibleTime"
                  :readonly="!minDate"
                  @focus="minDate && (maxTimePickerVisible = true)"
                  @input="value => handleTimeInput(value, 'max')"
                  @change="value => handleTimeChange(value, 'max')" />
                <time-picker
                  ref="maxTimePicker"
                  @pick="handleMaxTimePick"
                  :time-arrow-control="arrowControl"
                  :visible="maxTimePickerVisible"
                  @mounted="$refs.maxTimePicker.format=timeFormat">
                </time-picker>
              </span>
            </span>
          </div>
          <div class="flex-horizontal">
            <div class="c-picker-panel-content c-date-range-picker-content left">
              <div class="c-date-range-picker-header">
                <c-button
                        type="icon"
                        @click="leftPrevYear"
                        size="small"
                        icon="fast-backward"
                        class="c-picker-panel-icon-button"></c-button>
                <c-button
                        type="icon"
                        @click="leftPrevMonth"
                        size="small"
                        icon="prev"
                        class="c-picker-panel-icon-button"></c-button>
                <div>{{ leftLabel }}</div>
                <c-button
                        type="icon"
                        @click="leftNextMonth"
                        size="small"
                        v-if="unlinkPanels"
                        :disabled="!enableMonthArrow"
                        :class="{ 'disabled': !enableMonthArrow }"
                        icon="fast-backward"
                        class="c-picker-panel-icon-button"></c-button>
                <c-button
                    type="icon"
                    @click="leftNextYear"
                    size="small"
                    v-if="unlinkPanels"
                    :disabled="!enableYearArrow"
                    :class="{ 'disabled': !enableYearArrow }"
                    icon="next"
                    class="c-picker-panel-icon-button"></c-button>
              </div>
              <date-table
                      selection-mode="range"
                      :date="leftDate"
                      :default-value="defaultValue"
                      :min-date="minDate"
                      :max-date="maxDate"
                      :range-state="rangeState"
                      :disabled-date="disabledDate"
                      :cell-class-name="cellClassName"
                      @changerange="handleChangeRange"
                      :first-day-of-week="firstDayOfWeek"
                      @pick="handleRangePick">
              </date-table>
            </div>
            <div class="c-picker-panel-content c-date-range-picker-content right">
              <div class="c-date-range-picker-header">
                <c-button
                        type="icon"
                        @click="rightPrevYear"
                        size="small"
                        v-if="unlinkPanels"
                        :disabled="!enableYearArrow"
                        :class="{ 'disabled': !enableYearArrow }"
                        icon="fast-backward"
                        class="c-picker-panel-icon-button"></c-button>
                <c-button
                        type="icon"
                        @click="rightPrevMonth"
                        size="small"
                        v-if="unlinkPanels"
                        :disabled="!enableMonthArrow"
                        :class="{ 'disabled': !enableMonthArrow }"
                        icon="prev"
                        class="c-picker-panel-icon-button"></c-button>
                <div>{{ rightLabel }}</div>
                <c-button
                        type="icon"
                        @click="rightNextMonth"
                        size="small"
                        icon="next"
                        class="c-picker-panel-icon-button"></c-button>
                <c-button
                    type="icon"
                    @click="rightNextYear"
                    size="small"
                    icon="fast-forward"
                    class="c-picker-panel-icon-button"></c-button>
              </div>
              <date-table
                      selection-mode="range"
                      :date="rightDate"
                      :default-value="defaultValue"
                      :min-date="minDate"
                      :max-date="maxDate"
                      :range-state="rangeState"
                      :disabled-date="disabledDate"
                      :cell-class-name="cellClassName"
                      @changerange="handleChangeRange"
                      :first-day-of-week="firstDayOfWeek"
                      @pick="handleRangePick">
              </date-table>
            </div>
          </div>
        </div>
      </div>
      <div class="c-picker-panel-footer" v-if="showTime">
        <c-button
          type="text"
          class="c-picker-panel-link-button"
          @click="handleClear">
          {{ t('core.datepicker.clear') }}
        </c-button>
        <c-button
          plain
          scene="primary"
          class="c-picker-panel-link-button"
          :disabled="buttonDisabled"
          @click="handleConfirm(false)">
          {{ t('core.datepicker.confirm') }}
        </c-button>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  formatDate,
  parseDate,
  isDate,
  modifyDate,
  modifyTime,
  modifyWithTimeString,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  nextDate,
  extractDateFormat,
  extractTimeFormat
} from '../../../../utils/date-util';
import Clickoutside from 'canknow-ui-core/src/directives/clickoutside';
import Locale from '../../../../mixins/locale';
import TimePicker from './time';
import DateTable from '../basic/date-table';


const calcDefaultValue = (defaultValue) => {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  }
  else if (defaultValue) {
    return [new Date(defaultValue), nextDate(new Date(defaultValue), 1)];
  }
  else {
    return [new Date(), nextDate(new Date(), 1)];
  }
};

export default {
  mixins: [Locale],
  directives: { Clickoutside },
  computed: {
    buttonDisabled() {
      return !(this.minDate && this.maxDate && !this.selecting && this.isValidValue([this.minDate, this.maxDate]));
    },

    leftLabel() {
      return this.leftDate.getFullYear() + ' ' + this.t('core.datepicker.year') + ' ' + this.t(`core.datepicker.month${ this.leftDate.getMonth() + 1 }`);
    },

    rightLabel() {
      return this.rightDate.getFullYear() + ' ' + this.t('core.datepicker.year') + ' ' + this.t(`core.datepicker.month${ this.rightDate.getMonth() + 1 }`);
    },

    leftYear() {
      return this.leftDate.getFullYear();
    },

    leftMonth() {
      return this.leftDate.getMonth();
    },

    leftMonthDate() {
      return this.leftDate.getDate();
    },

    rightYear() {
      return this.rightDate.getFullYear();
    },

    rightMonth() {
      return this.rightDate.getMonth();
    },

    rightMonthDate() {
      return this.rightDate.getDate();
    },

    minVisibleDate() {
      if (this.dateUserInput.min !== null) return this.dateUserInput.min;
      if (this.minDate) return formatDate(this.minDate, this.dateFormat);
      return '';
    },

    maxVisibleDate() {
      if (this.dateUserInput.max !== null) return this.dateUserInput.max;
      if (this.maxDate || this.minDate) return formatDate(this.maxDate || this.minDate, this.dateFormat);
      return '';
    },

    minVisibleTime() {
      if (this.timeUserInput.min !== null) return this.timeUserInput.min;
      if (this.minDate) return formatDate(this.minDate, this.timeFormat);
      return '';
    },

    maxVisibleTime() {
      if (this.timeUserInput.max !== null) return this.timeUserInput.max;
      if (this.maxDate || this.minDate) return formatDate(this.maxDate || this.minDate, this.timeFormat);
      return '';
    },

    timeFormat() {
      if (this.format) {
        return extractTimeFormat(this.format);
      }
      else {
        return 'HH:mm:ss';
      }
    },

    dateFormat() {
      if (this.format) {
        return extractDateFormat(this.format);
      }
      else {
        return 'yyyy-MM-dd';
      }
    },

    enableMonthArrow() {
      const nextMonth = (this.leftMonth + 1) % 12;
      const yearOffset = this.leftMonth + 1 >= 12 ? 1 : 0;
      return this.unlinkPanels && new Date(this.leftYear + yearOffset, nextMonth) < new Date(this.rightYear, this.rightMonth);
    },

    enableYearArrow() {
      return this.unlinkPanels && this.rightYear * 12 + this.rightMonth - (this.leftYear * 12 + this.leftMonth + 1) >= 12;
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
      rightDate: nextMonth(new Date()),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      showTime: false,
      shortcuts: '',
      visible: '',
      disabledDate: '',
      cellClassName: '',
      firstDayOfWeek: 7,
      minTimePickerVisible: false,
      maxTimePickerVisible: false,
      format: '',
      arrowControl: false,
      unlinkPanels: false,
      dateUserInput: {
        min: null,
        max: null
      },
      timeUserInput: {
        min: null,
        max: null
      }
    };
  },
  watch: {
    minDate(value) {
      this.dateUserInput.min = null;
      this.timeUserInput.min = null;
      this.$nextTick(() => {
        if (this.$refs.maxTimePicker && this.maxDate && this.maxDate < this.minDate) {
          const format = 'HH:mm:ss';
          this.$refs.maxTimePicker.selectableRange = [
            [
              parseDate(formatDate(this.minDate, format), format),
              parseDate('23:59:59', format)
            ]
          ];
        }
      });
      if (value && this.$refs.minTimePicker) {
        this.$refs.minTimePicker.date = value;
        this.$refs.minTimePicker.value = value;
      }
    },

    maxDate(value) {
      this.dateUserInput.max = null;
      this.timeUserInput.max = null;
      if (value && this.$refs.maxTimePicker) {
        this.$refs.maxTimePicker.date = value;
        this.$refs.maxTimePicker.value = value;
      }
    },

    minTimePickerVisible(value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.minTimePicker.date = this.minDate;
          this.$refs.minTimePicker.value = this.minDate;
          this.$refs.minTimePicker.adjustSpinners();
        });
      }
    },

    maxTimePickerVisible(value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.maxTimePicker.date = this.maxDate;
          this.$refs.maxTimePicker.value = this.maxDate;
          this.$refs.maxTimePicker.adjustSpinners();
        });
      }
    },

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
            const minDateMonth = this.minDate.getMonth();
            const maxDateYear = this.maxDate.getFullYear();
            const maxDateMonth = this.maxDate.getMonth();
            this.rightDate = minDateYear === maxDateYear && minDateMonth === maxDateMonth
              ? nextMonth(this.maxDate)
              : this.maxDate;
          }
          else {
            this.rightDate = nextMonth(this.leftDate);
          }
        }
        else {
          this.leftDate = calcDefaultValue(this.defaultValue)[0];
          this.rightDate = nextMonth(this.leftDate);
        }
      }
    },

    defaultValue(value) {
      if (!Array.isArray(this.value)) {
        const [left, right] = calcDefaultValue(value);
        this.leftDate = left;
        this.rightDate = value && value[1] && this.unlinkPanels
          ? right
          : nextMonth(this.leftDate);
      }
    }
  },
  methods: {
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = calcDefaultValue(this.defaultValue)[0];
      this.rightDate = nextMonth(this.leftDate);
      this.$emit('pick', null);
    },

    handleChangeRange(value) {
      this.minDate = value.minDate;
      this.maxDate = value.maxDate;
      this.rangeState = value.rangeState;
    },

    handleDateInput(value, type) {
      this.dateUserInput[type] = value;
      if (value.length !== this.dateFormat.length) return;
      const parsedValue = parseDate(value, this.dateFormat);

      if (parsedValue) {
        if (typeof this.disabledDate === 'function' &&
            this.disabledDate(new Date(parsedValue))) {
          return;
        }
        if (type === 'min') {
          this.minDate = modifyDate(this.minDate || new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          this.leftDate = new Date(parsedValue);
          if (!this.unlinkPanels) {
            this.rightDate = nextMonth(this.leftDate);
          }
        }
        else {
          this.maxDate = modifyDate(this.maxDate || new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          this.rightDate = new Date(parsedValue);
          if (!this.unlinkPanels) {
            this.leftDate = prevMonth(parsedValue);
          }
        }
      }
    },

    handleDateChange(value, type) {
      const parsedValue = parseDate(value, this.dateFormat);
      if (parsedValue) {
        if (type === 'min') {
          this.minDate = modifyDate(this.minDate, parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          if (this.minDate > this.maxDate) {
            this.maxDate = this.minDate;
          }
        }
        else {
          this.maxDate = modifyDate(this.maxDate, parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          if (this.maxDate < this.minDate) {
            this.minDate = this.maxDate;
          }
        }
      }
    },

    handleTimeInput(value, type) {
      this.timeUserInput[type] = value;
      if (value.length !== this.timeFormat.length) return;
      const parsedValue = parseDate(value, this.timeFormat);

      if (parsedValue) {
        if (type === 'min') {
          this.minDate = modifyTime(this.minDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          this.$nextTick(_ => this.$refs.minTimePicker.adjustSpinners());
        }
        else {
          this.maxDate = modifyTime(this.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          this.$nextTick(_ => this.$refs.maxTimePicker.adjustSpinners());
        }
      }
    },

    handleTimeChange(value, type) {
      const parsedValue = parseDate(value, this.timeFormat);
      if (parsedValue) {
        if (type === 'min') {
          this.minDate = modifyTime(this.minDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          if (this.minDate > this.maxDate) {
            this.maxDate = this.minDate;
          }
          this.$refs.minTimePicker.value = this.minDate;
          this.minTimePickerVisible = false;
        }
        else {
          this.maxDate = modifyTime(this.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          if (this.maxDate < this.minDate) {
            this.minDate = this.maxDate;
          }
          this.$refs.maxTimePicker.value = this.minDate;
          this.maxTimePickerVisible = false;
        }
      }
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
      if (!close || this.showTime) return;
      this.handleConfirm();
    },

    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },

    handleMinTimePick(value, visible, first) {
      this.minDate = this.minDate || new Date();
      if (value) {
        this.minDate = modifyTime(this.minDate, value.getHours(), value.getMinutes(), value.getSeconds());
      }

      if (!first) {
        this.minTimePickerVisible = visible;
      }

      if (!this.maxDate || this.maxDate && this.maxDate.getTime() < this.minDate.getTime()) {
        this.maxDate = new Date(this.minDate);
      }
    },

    handleMinTimeClose() {
      this.minTimePickerVisible = false;
    },

    handleMaxTimePick(value, visible, first) {
      if (this.maxDate && value) {
        this.maxDate = modifyTime(this.maxDate, value.getHours(), value.getMinutes(), value.getSeconds());
      }

      if (!first) {
        this.maxTimePickerVisible = visible;
      }

      if (this.maxDate && this.minDate && this.minDate.getTime() > this.maxDate.getTime()) {
        this.minDate = new Date(this.maxDate);
      }
    },

    handleMaxTimeClose() {
      this.maxTimePickerVisible = false;
    },

    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear() {
      this.leftDate = prevYear(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = nextMonth(this.leftDate);
      }
    },

    leftPrevMonth() {
      this.leftDate = prevMonth(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = nextMonth(this.leftDate);
      }
    },

    rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = nextYear(this.leftDate);
        this.rightDate = nextMonth(this.leftDate);
      }
      else {
        this.rightDate = nextYear(this.rightDate);
      }
    },

    rightNextMonth() {
      if (!this.unlinkPanels) {
        this.leftDate = nextMonth(this.leftDate);
        this.rightDate = nextMonth(this.leftDate);
      }
      else {
        this.rightDate = nextMonth(this.rightDate);
      }
    },

    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear() {
      this.leftDate = nextYear(this.leftDate);
    },

    leftNextMonth() {
      this.leftDate = nextMonth(this.leftDate);
    },

    rightPrevYear() {
      this.rightDate = prevYear(this.rightDate);
    },

    rightPrevMonth() {
      this.rightDate = prevMonth(this.rightDate);
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
      if (this.minDate && this.maxDate == null) this.rangeState.selecting = false;
      this.minDate = this.value && isDate(this.value[0]) ? new Date(this.value[0]) : null;
      this.maxDate = this.value && isDate(this.value[0]) ? new Date(this.value[1]) : null;
    }
  },
  components: { TimePicker, DateTable }
};
</script>
