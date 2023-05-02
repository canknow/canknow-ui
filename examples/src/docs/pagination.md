## Pagination

If you have too much data to display in one page, use pagination.

### Basic usage

:::demo
```html
<template>
  <div>
        <c-pagination :total="total" show-sizer show-elevator show-total :current.sync="current"></c-pagination>
        <div class="margin-top-1 margin-bottom-1">
            <c-button @click="subject">Subject</c-button>
            <c-button @click="change">Change</c-button>
            {{ current }}
        </div>
        <c-pagination :current="2" :total="10000"></c-pagination>
   </div>
</template>
<script>
       export default {
           name: 'DocumentPagination',
           data () {
               return {
                   current: 1,
                   total: 1000
               }
           },
           methods: {
               subject() {
                   this.total -= 1;
               },
               change() {
                   this.current = 1;
               }
           }
       };
</script>
```
:::