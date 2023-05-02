<template>
    <div class="page-sidebar">
        <div class="page-sidebar-wrap">
            <slot></slot>
            <nav class="document-list">
                <ul class="">
                    <li v-for="item in menus" :key="item.name">
                        <div class="document-group-item" v-if="item.children&&item.children.length">
                            <template>
                                <span class="title">{{item.name}}</span>
                            </template>
                            <ul>
                                <li v-for="childItem in item.children" :key="childItem.name">
                                    <div class="document-item">
                                        <router-link class="title" :to="childItem.path.slice(1)">{{childItem.name}}</router-link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="document-item" v-else>
                            <router-link class="title" :to="item.path.slice(1)"> {{item.name}}</router-link>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PageSidebar',
  props: {
    menus: Array,
    openNames: {
      type: Array
    }
  },
  data () {
    return {
      activeName: null,
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.activeName = this.$route.name.replace('component-', '');
    });
  }
};
</script>
