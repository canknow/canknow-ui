<template>
  <div class="document-container">
    <c-scrollbar class="page-sidebar-scrollbar">
      <PageSidebar :menus="menus" @change="handlePageSidebarMenuChange"></PageSidebar>
    </c-scrollbar>
    <div class="content-padding document-body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import PageSidebar from './../common/PageSidebar';
import navConfig from '../../nav.config.json';

export default {
  name: 'Document',
  components: {
    PageSidebar
  },
  computed: {
    menus () {
      return navConfig.menus;
    }
  },
  methods: {
    handlePageSidebarMenuChange(path){
      this.$router.push({ path: '/component' + path });
    }
  }
};
</script>
<style lang="scss">
@import "./../../../../src/scss/helper";

.document-container {
  .page-sidebar-scrollbar {
    width: 20rem;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    margin-top: $component-size-larger;
    transition: padding-top $transition-time;
    overflow: hidden;
    border-right: $border-width solid $split-color;

    &>.scrollbar-wrap {
      height: 100%;
      overflow-x: auto;
    }
  }
  .document-body{
    margin-left: 22rem;
  }
}
@include media-breakpoint-down(sm) {
  .document-container {

    .page-sidebar-scrollbar {
      width: calc(100% - 2rem);
      position: relative;
      margin-top: $component-span;
      margin-bottom: $component-span;
      left: $component-span;
      right: $component-span;
      border-right: none;
    }
    .document-body{
      margin-left: 0;
      padding-top: 0;
    }
  }
}
</style>
