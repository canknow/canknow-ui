:::demo

```html
 <c-button border circle @click="showLoading">{{'showLoading'}}</c-button>
<script>
    export default {
        data () {
            return {
                loading: false
            }
        },
        methods: {
            showLoading () {
                this.$Loading.show();
                setTimeout(() => {
                    this.$Loading.hide();
                }, 5000);
            }
        }
    };
</script>
```
:::

:::demo
```html
<template>
<div class="height-em30 bg-color-blueLight" v-loading="loading"></div>
<div class="margin-top-1">
<c-button border circle @click="loading=!loading">toggle loading</c-button>
</div>
</template>
<script>
    export default {
        data () {
            return {
                loading: false
            }
        }
    };
</script>
```
:::


:::demo
```html
<template>
<c-loading>loading text</c-loading>
</template>
```
:::
