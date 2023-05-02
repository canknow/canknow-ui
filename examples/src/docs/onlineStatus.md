:::demo

```html
<template>
      <div class="margin-bottom-1"><c-online-status :status="online"><c-button>button</c-button></c-online-status></div>
      <div class="margin-bottom-1"><c-online-status :status="online" size="small"><c-button>button</c-button></c-online-status></div>
      <div><c-button border circle @click="toggleStatus">toggleStatus</c-button></div>
</template> 
<script>
    export default {
        data () {
            return {
                online: false
            }
        },
        methods: {
            toggleStatus () {
                this.online = !this.online;
            }
        }
    }
</script>
```
:::