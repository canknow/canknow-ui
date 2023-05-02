<template>
    <div class="c-thumbnail" :class="classes">
        <div class="c-thumbnail-icon-box">
            <slot name="icon"></slot>
            <icon class="c-thumbnail-icon" :name="icon" v-if="icon"></icon>
        </div>
        <div class="c-thumbnail-cover-box">
            <slot name="cover"></slot>
            <img class="c-thumbnail-cover" :src="cover" v-if="cover">
        </div>
        <div class="c-thumbnail-body">
            <label class="c-thumbnail-title">{{title}}</label>
            <div class="c-thumbnail-content">
                {{content}}
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CThumbnail',
  props: {
    icon: {
      type: String
    },
    cover: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Boolean,
      default: false,
    },
    justifyCenter: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    classes() {
      return [
        {
          shadow: !!this.shadow,
          radius: !!this.radius,
          ['justify-center']: !!this.justifyCenter
        }
      ];
    }
  }
};
</script>

