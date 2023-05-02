<template>
  <c-popover
      v-bind="$attrs"
      v-model="visible"
      trigger="click">
    <div class="c-pop-confirm">
      <p class="c-pop-confirm-main">{{title}}</p>
      <div class="c-pop-confirm-action">
        <c-button
            size="small"
            scene="default"
            @click="cancel">
          {{ displayCancelButtonText }}
        </c-button>
        <c-button
            size="small"
            scene="primary"
            @click="confirm">
          {{ displayConfirmButtonText }}
        </c-button>
      </div>
    </div>
    <slot name="reference" slot="reference"></slot>
  </c-popover>
</template>

<script>
import { t } from '../../../locale/index';

export default {
  name: 'CPopConfirm',
  props: {
    title: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    displayConfirmButtonText() {
      return this.confirmButtonText || t('core.popConfirm.confirmButtonText');
    },
    displayCancelButtonText() {
      return this.cancelButtonText || t('core.popConfirm.cancelButtonText');
    }
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit('confirm');
    },
    cancel() {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>
