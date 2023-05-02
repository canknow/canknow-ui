<template>
  <div id="app" class="app">
    <div class="page">
      <c-page-header :menuList="menus"
                     fixed-top
                     theme="dark"
                     :default-active-menu-name="activeMenuName"
                     @change="handleMainMenuChange"
                     :page-logo="pageLogo">
        <language-selector class="hidden-sm-and-down"></language-selector>
      </c-page-header>
      <div class="page-content">
        <router-view></router-view>
      </div>
      <c-page-footer :aboutUs="aboutUs" :copyRight="copyRight"></c-page-footer>
    </div>
  </div>
</template>

<script>
import packageConfig from './../../../package';
import pageLogo from '../assets/images/title-logo.png';

export default {
  name: 'Layout',
  data() {
    return {
      activeMenuName: null,
      pageLogo,
      menus: [
        {
          title: 'home',
          name: 'home',
          path: '/layout/home'
        },
        {
          title: 'guide',
          name: 'guide',
          path: '/layout/guide'
        },
        {
          title: 'document',
          name: 'document',
          path: '/layout/document'
        }
      ]
    };
  },
  computed: {
    aboutUs () {
      return packageConfig.author;
    },
    copyRight () {
      return packageConfig.version;
    },
    pageTitle () {
      return packageConfig.name;
    }
  },
  methods: {
    handleMainMenuChange(menuItem){
      if (menuItem.url) {
        window.open(menuItem.url);
      }
      else {
        this.$router.push({ name: menuItem.name });
      }
    }
  },
  mounted() {
    const route = this.$route;
    const menuItem = this.menus.find((menuItem) => {
      return route.fullPath.indexOf(menuItem.path) > -1;
    });
    if (menuItem) {
      this.activeMenuName = menuItem.name;
    }
  },
  beforeDestroy() {

  }
};
</script>

