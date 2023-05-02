<template>
    <div v-if="showSizer || showElevator" :class="optionsClasses">
        <div v-if="showSizer" :class="sizerClasses">
            <c-select v-model="currentPageSize" :placement="placement" @change="changeSize">
                <c-option v-for="item in pageSizeOptions" :key="item" :value="item">{{ item }} {{ t('core.page.page') }}</c-option>
            </c-select>
        </div>
        <div v-if="showElevator" :class="ElevatorClasses">
            {{ t('core.page.goto') }}
            <input
              type="number"
              class="c-pagination-editor input-base"
              :value="_current"
              autocomplete="off"
              spellcheck="false"
              min="0"
              @change="changePage">
            {{ t('core.page.pageName') }}
        </div>
    </div>
</template>
<script>
import Locale from '../../../mixins/locale';

function isValueNumber (value) {
  return (/^[1-9][0-9]*$/).test(value + '');
}

export default {
  name: 'CPageOption',
  mixins: [ Locale ],
  props: {
    pageSizeOptions: Array,
    showSizer: Boolean,
    showElevator: Boolean,
    current: Number,
    _current: Number,
    pageSize: Number,
    allPages: Number,
    placement: String
  },
  data () {
    return {
      currentPageSize: this.pageSize
    };
  },
  watch: {
    pageSize (value) {
      this.currentPageSize = value;
    }
  },
  computed: {
    optionsClasses () {
      return [
        'c-pagination-options'
      ];
    },
    sizerClasses () {
      return [
        'c-pagination-options-sizer'
      ];
    },
    ElevatorClasses () {
      return [
        'c-pagination-options-elevator'
      ];
    }
  },
  methods: {
    changeSize () {
      this.$emit('size', this.currentPageSize);
    },
    changePage (event) {
      let value = event.target.value.trim();
      let page = 0;

      if (isValueNumber(value)) {
        value = Number(value);

        if (value !== this.current) {
          const allPages = this.allPages;

          if (value > allPages) {
            page = allPages;
          }
          else {
            page = value;
          }
        }
      }
      else {
        page = 1;
      }

      if (page) {
        this.$emit('page', page);
        event.target.value = page;
      }
    }
  }
};
</script>
