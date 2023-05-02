<template>
  <div class="c-pagination" :class="wrapClasses" :style="styles">
    <ul class="c-pagination-list">
      <li class="c-pagination-total" v-if="showTotal">
        <slot>{{ t('core.page.total') }} {{ total }}
          <template v-if="total <= 1">{{ t('core.page.item') }}</template><template v-else>{{ t('core.page.items') }}</template>
        </slot>
      </li>
      <li :title="t('core.page.prev')"
          :class="prevClasses"
          @click="prev">
        <a><icon name="prev"></icon></a>
      </li>
      <li title="1" :class="firstPageClasses" @click="changePage(1)"><a>1</a></li>
      <li :title="t('core.page.prev5')" v-if="currentPage - 3 > 1" class="c-pagination-item-jump-prev" @click="fastPrev"><a><icon name="fast-backward"></icon></a></li>
      <li :title="currentPage - 2" v-if="currentPage - 2 > 1" class="c-pagination-item" @click="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
      <li :title="currentPage - 1" v-if="currentPage - 1 > 1" class="c-pagination-item" @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
      <li :title="currentPage" v-if="currentPage !== 1 && currentPage !== allPages" :class="['c-pagination-item',  'current']"><a>{{ currentPage }}</a></li>
      <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" class="c-pagination-item" @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
      <li :title="currentPage + 2" v-if="currentPage + 2 < allPages" class="c-pagination-item" @click="changePage(currentPage + 2)"><a>{{ currentPage + 2 }}</a></li>
      <li :title="t('core.page.next5')" v-if="currentPage + 3 < allPages" class="c-pagination-item-jump-next" @click="fastNext"><a><icon name="fast-forward"></icon></a></li>
      <li :title="allPages" v-if="allPages > 1" :class="lastPageClasses" @click="changePage(allPages)"><a>{{ allPages }}</a></li>
      <li :title="t('core.page.next')"
          :class="nextClasses"
          @click="next">
        <a><icon name="next"></icon></a>
      </li>
    </ul>
    <Options :show-sizer="showSizer"
             :page-size="currentPageSize"
             :page-size-options="pageSizeOptions"
             :placement="placement"
             :show-elevator="showElevator"
             :_current.once="currentPage"
             :current="currentPage"
             :all-pages="allPages"
             @size="onSize"
             @page="onPage">
    </Options>
  </div>
</template>
<script>
import { oneOf } from 'canknow-ui-core/src/utils/assist';
import Options from './Options.vue';
import Locale from '../../../mixins/locale';

export default {
  name: 'CPagination',
  mixins: [ Locale ],
  components: { Options },
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOptions: {
      type: Array,
      default () {
        return [10, 20, 30, 40];
      }
    },
    placement: {
      validator (value) {
        return oneOf(value, ['top', 'bottom']);
      },
      default: 'bottom'
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    className: {
      type: String
    },
    styles: {
      type: Object
    }
  },
  data () {
    return {
      currentPage: this.current,
      currentPageSize: this.pageSize
    };
  },
  watch: {
    total (value) {
      let maxPage = Math.ceil(value / this.currentPageSize);

      if (maxPage < this.currentPage && maxPage > 0) {
        this.currentPage = maxPage;
      }
    },
    current (value) {
      this.currentPage = value;
    },
    pageSize (value) {
      this.currentPageSize = value;
    }
  },
  computed: {
    allPages () {
      const allPage = Math.ceil(this.total / this.currentPageSize);
      return (allPage === 0) ? 1 : allPage;
    },
    wrapClasses () {
      return [
        {
          [`${this.className}`]: !!this.className
        }
      ];
    },
    prevClasses () {
      return [
        'c-pagination-prev',
        {
          ['disabled']: this.currentPage === 1
        }
      ];
    },
    nextClasses () {
      return [
        'c-pagination-next',
        {
          ['disabled']: this.currentPage === this.allPages
        }
      ];
    },
    firstPageClasses () {
      return [
        'c-pagination-item',
        {
          ['current']: this.currentPage === 1
        }
      ];
    },
    lastPageClasses () {
      return [
        'c-pagination-item',
        {
          ['current']: this.currentPage === this.allPages
        }
      ];
    }
  },
  methods: {
    changePage (page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
        this.$emit('update:current', page);
        this.$emit('change', page);
      }
    },
    prev () {
      const current = this.currentPage;
      if (current <= 1) {
        return false;
      }
      this.changePage(current - 1);
    },
    next () {
      const current = this.currentPage;
      if (current >= this.allPages) {
        return false;
      }
      this.changePage(current + 1);
    },
    fastPrev () {
      const page = this.currentPage - 5;
      if (page > 0) {
        this.changePage(page);
      }
      else {
        this.changePage(1);
      }
    },
    fastNext () {
      const page = this.currentPage + 5;
      if (page > this.allPages) {
        this.changePage(this.allPages);
      }
      else {
        this.changePage(page);
      }
    },
    onSize (pageSize) {
      this.currentPageSize = pageSize;
      this.$emit('pages-size-change', pageSize);
      this.changePage(1);
    },
    onPage (page) {
      this.changePage(page);
    },
    keyDown (e) {
      const key = e.keyCode;
      const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39;

      if (!condition) {
        e.preventDefault();
      }
    },
    keyUp (e) {
      const key = e.keyCode;
      const value = parseInt(e.target.value);

      if (key === 38) {
        this.prev();
      }
      else if (key === 40) {
        this.next();
      }
      else if (key === 13) {
        let page = 1;

        if (value > this.allPages) {
          page = this.allPages;
        }
        else if (value <= 0 || !value) {
          page = 1;
        }
        else {
          page = value;
        }
        e.target.value = page;
        this.changePage(page);
      }
    }
  }
};
</script>
