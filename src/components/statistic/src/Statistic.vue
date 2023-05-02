<template>
  <div class="c-statistic">
    <div class="c-statistic-title">{{ title }}</div>
    <div class="c-statistic-content">
      <span class="c-statistic-content-value" :class="classes">
        <span class="c-statistic-content-value-int">{{ negative }}{{ int }}</span>
          <span class="c-statistic-content-value-decimal">{{ decimal }}</span>
      </span>
    </div>
  </div>
</template>

<script type="text/jsx">
import padEnd from 'lodash/padEnd';
import sceneMixin from '../../../mixins/sceneMixin';

export default {
  name: 'CStatistic',
  mixins: [sceneMixin],
  props: {
    title: null,
    value: null,
    decimalSeparator: {
      type: String
    },
    formatter: {
      type: Function
    },
    suffix: {
      type: String
    },
    groupSeparator: {
      type: String,
      default: ','
    },
    precision: null
  },
  computed: {
    classes() {
      return [
        this.scene
      ];
    },
    cells () {
      const value = String(this.value);
      return value.match(/^(-?)(\d*)(\.(\d+))?$/);
    },
    negative () {
      return this.cells[1];
    },
    int () {
      let int = this.cells[2] || '0';
      int = int.replace(/\B(?=(\d{3})+(?!\d))/g, this.groupSeparator);
      return int;
    },
    decimal () {
      let decimal = this.cells[4] || '';

      if (typeof this.precision === 'number') {
        decimal = padEnd(decimal, this.precision, '0').slice(0, this.precision);
      }
      if (decimal) {
        decimal = `${this.decimalSeparator}${decimal}`;
      }
      return decimal;
    }
  },
};
</script>
