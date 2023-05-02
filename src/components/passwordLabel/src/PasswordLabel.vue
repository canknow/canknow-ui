<template>
  <label class="c-password-label" @click="toggle">
    <span v-if="showPassword">{{ password || '-' }}</span>
    <span v-else>******</span>
  </label>
</template>

<script>
export default {
  name: 'CPasswordLabel',
  props: {
    password: {
      type: String
    }
  },
  data () {
    return {
      showPassword: false
    };
  },
  methods: {
    toggle () {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>
