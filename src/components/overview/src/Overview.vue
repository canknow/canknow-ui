<template>
    <div class="c-overview">
        <div class="c-overview-icon-block">
            <icon :name="icon"></icon>
        </div>
        <div class="c-overview-details">
            <p class="c-overview-detail-value">{{value}}</p>
            <label class="c-overview-detail-label">{{label}}</label>
        </div>
        <span class="c-overview-more" @click="handleViewMore">
            <span class="c-overview-more-text">{{t('viewMore')}}</span>
            <icon name="more" class="c-overview-more-icon"></icon>
        </span>
    </div>
</template>
<script>
import Locale from '../../../mixins/locale';

export default {
  name: 'COverview',
  mixins: [ Locale ],
  props: {
    label: {
      type: String,
      default: 'label'
    },
    value: {
      type: [Number, String],
      default: 'value'
    },
    icon: {
      type: String,
    }
  },
  methods: {
    handleViewMore () {
      this.$emit('viewMore');
    }
  }
};
</script>
