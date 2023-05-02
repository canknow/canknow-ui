<template>
    <div class="c-blank-wrapper" :class="classes">
        <icon name="empty" class="c-blank-icon"></icon>
        <div class="c-blank">
            <slot>{{computedText}}</slot>
        </div>
    </div>
</template>

<script>
import Locale from '../../../mixins/locale';

export default {
  name: 'CBlank',
  mixins: [ Locale ],
  props: {
    text: {
      type: String
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    classes() {
      return [this.size];
    },
    computedText () {
      return this.text || this.t('core.blank.common');
    }
  }
};
</script>
