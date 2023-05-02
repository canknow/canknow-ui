<template>
  <div class="c-step-item" :class="wrapClasses" :style="styles">
    <div class="c-step-tail"><i></i></div>
    <div class="c-step-header">
      <div class="c-step-header-inner">
        <span v-if="!icon && currentStatus !== 'finish' && currentStatus !== 'error'">{{ stepNumber }}</span>
        <icon v-else :name="iconName"></icon>
      </div>
    </div>
    <div class="c-step-main">
      <slot name="title">
        <div class="c-step-title" v-if="title">{{ title }}</div>
      </slot>
      <slot>
        <div v-if="content" class="c-step-content">{{ content }}</div>
      </slot>
    </div>
  </div>
</template>
<script>
import Emitter from 'canknow-ui-core/src/mixins/emitter';
import { oneOf } from 'canknow-ui-core/src/utils/assist';

export default {
  name: 'CStep',
  mixins: [ Emitter ],
  props: {
    status: {
      validator (value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error']);
      }
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String
    },
    icon: {
      type: String
    }
  },
  data () {
    return {
      stepNumber: '',
      nextError: false,
      total: 1,
      currentStatus: ''
    };
  },
  computed: {
    wrapClasses () {
      return [
        `${this.currentStatus}`,
        {
          ['c-step-custom']: !!this.icon,
          ['c-step-next-error']: this.nextError
        }
      ];
    },
    iconName () {
      let icon = '';

      if (this.icon) {
        icon = this.icon;
      }
      else {
        if (this.currentStatus === 'finish') {
          icon = 'success';
        }
        else if (this.currentStatus === 'error') {
          icon = 'cry';
        }
      }
      return icon;
    },
    styles () {
      return {
        width: `${1/this.total*100}%`
      };
    }
  },
  watch: {
    status (value) {
      this.currentStatus = value;

      if (this.currentStatus === 'error') {
        this.$parent.setNextError();
      }
    }
  },
  created () {
    this.currentStatus = this.status;
  },
  mounted () {
    this.dispatch('Steps', 'append');
  },
  beforeDestroy () {
    this.dispatch('Steps', 'remove');
  }
};
</script>
