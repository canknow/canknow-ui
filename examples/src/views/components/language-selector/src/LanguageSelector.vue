<template>
  <c-dropdown placement="bottom-end" split-button type="primary" @select="setLanguage">
    {{currentLanguageObject.displayName}}
    <c-dropdown-menu slot="dropdown">
      <c-dropdown-menu-item v-for="(item, key) in languages" v-if="key!==currentLanguage" :key="key" :name="key">
        {{item.displayName}}
      </c-dropdown-menu-item>
    </c-dropdown-menu>
  </c-dropdown>
</template>

<script>
export default {
  data () {
    return {
      currentLanguage: null,
      languages: {}
    };
  },
  computed: {
    currentLanguageObject () {
      return this.currentLanguage ? this.languages[this.currentLanguage] : {};
    }
  },
  methods: {
    setLanguage (key) {
      this.$i18n.locale = key;
      window.localStorage.lang = key;
      this.currentLanguage = key;
    }
  },
  created () {
    this.languages = {
      'zh-CN': {
        displayName: '中文',
        icon: 'zhCN'
      },
      'en-US': {
        displayName: 'English',
        icon: 'enUS'
      }
    };
    this.currentLanguage = this.$i18n.locale;
  }
};
</script>
