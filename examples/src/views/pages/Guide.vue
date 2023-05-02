<template>
  <div class="page-guide">
    <router-view class="content"></router-view>
  </div>
</template>
<script>
export default {
  components: {

  },
  data() {
    return {
      menus: [
        {
          path: '/design',
          name: 'Design Disciplines'
        },
        {
          path: '/nav',
          name: 'Navigation'
        }
      ]
    };
  }
};
</script>
