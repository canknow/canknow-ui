:::demo

```html
<template>
    <c-page-footer :about-us="aboutUs" :copy-right="copyRight" :version="version"></c-page-footer>
</template> 
<script>
    export default {
        data () {
            return {
                aboutUs: 'aboutUs',
                copyRight: 'copyRight',
                version: '2.0.1'
            }
        }
    }
</script>
```
:::
