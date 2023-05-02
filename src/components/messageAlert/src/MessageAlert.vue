<template>
    <transition name="fade">
        <div class="c-message-alert" :class="classes" v-if="show">
            <template>
                <div class="c-message-alert-icon-wrapper">
                    <icon class="c-message-alert-icon" :name="icon"></icon>
                </div>
                <div v-if="body" v-html="body"></div>
                <div class="c-message-body" v-if="!body">
                    <label class="c-message-title" v-if="title">{{title}}</label>
                    <div class="c-message-content">
                        {{content}}
                        <slot></slot>
                    </div>
                </div>
            </template>
        </div>
    </transition>
</template>
<script>
import iconTypes from './../../../common/sceneIconTypes';

export default {
  name: 'CMessageAlert',
  props: {
    body: {
      type: String
    },
    title: {
      type: String,
    },
    content: {
      type: String,
      default: ''
    },
    type: {
      default: 'info'
    }
  },
  data() {
    return {
      show: true
    };
  },
  computed: {
    icon() {
      return iconTypes[this.type];
    },
    classes() {
      return [
        this.type,
        { 'dismissible': this.closable }
      ];
    }
  },
  methods: {
    close (e) {
      this.show = false;
      this.$emit('close', e);
    }
  }
};
</script>
