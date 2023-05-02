<template>
  <footer class="c-page-footer">
    <div class="c-page-footer-base-info">
      <div class="c-page-footer-base-info-item c-page-footer-statement" v-if="statement">{{statement}}</div>
      <div class="c-page-footer-base-info-item c-page-footer-copyright" v-if="copyRight||aboutUs">
        <span class="copyright" v-if="copyRight">© {{copyRight}}</span>
        <span class="about-us component-span-left" v-if="aboutUs">{{aboutUs}}</span>
      </div>
      <div class="c-page-footer-base-info-item c-page-footer-ipc" v-if="ipc">
        <a :href="ipcLink" v-if="ipc">{{ipc}}</a>
      </div>
      <div class="c-page-footer-base-info-item c-page-footer-version" v-if="version">
        v{{version}}
      </div>
    </div>
    <slot name="out"></slot>
  </footer>
</template>

<script>
export default {
  name: 'CPageFooter',
  props: {
    statement: {
      type: String
    },
    aboutUs: {
      type: String
    },
    ipc: {
      type: String
    },
    ipcLink: {
      type: String
    },
    version: {
      type: String
    },
    copyRightLogo: {
      type: String
    },
    copyRight: {
      type: String
    },
  }
};
</script>

