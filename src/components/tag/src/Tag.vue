<template>
    <label class="c-tag" :class="classes" :style="{ backgroundColor: color }" @click="handleClick">
        <span class="c-tag-text"><slot></slot></span>
        <icon name="remove-circle" class="c-tag-close" v-if="closable" @click.native="handleClose"></icon>
    </label>
</template>
<script>
import sizeComponent from '../../../mixins/sizeComponent';

export default {
  name: 'CTag',
  mixins: [sizeComponent],
  props: {
    text: String,
    closable: Boolean,
    scene: {
      type: String,
      default: 'default'
    },
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    border: {
      type: Boolean,
      default: true
    },
    fill: {
      type: Boolean,
      default: true
    },
    radius: {
      type: Boolean,
      default: true
    },
    circle: Boolean
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit('close', event);
    },
    handleClick(event) {
      this.$emit('click', event);
    }
  },
  computed: {
    classes () {
      return[
        `${this.scene}`,
        `${this.size}`,
        {
          border: this.border,
          fill: this.fill,
          hit: this.hit
        }
      ];
    }
  }
};
</script>
