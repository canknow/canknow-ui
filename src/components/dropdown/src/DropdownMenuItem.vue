<template>
  <li class="c-dropdown-menu-item" :class="classes" @click="handleClick">
    <icon class="c-dropdown-menu-item-icon" :name="icon" v-if="icon"></icon>
    <slot>
      <label class="c-dropdown-menu-item-title">{{title}}</label>
    </slot>
  </li>
</template>
<script>
import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  name: 'CDropdownMenuItem',
  mixins: [Emitter],
  props: {
    title: {
      type: [String, Number]
    },
    icon: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    },
    command: {},
  },
  computed: {
    classes () {
      return {
        'disabled': this.disabled,
        'divided': this.divided
      };
    }
  },
  methods: {
    handleClick () {
      this.dispatch('CDropdown', 'menu-item-click', [this.command, this]);
    }
  }
};
</script>
