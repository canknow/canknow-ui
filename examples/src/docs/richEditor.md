:::demo

```html
<template>
      <c-input block class="margin-bottom-1" type="textarea" v-model="value"></c-input>
      <c-rich-editor v-model="value" :options="options"></c-rich-editor>
</template> 
<script>
    export default {
        data () {
          return {
              value: '<p>test</p>',
              options: {
                 height: 100,
                  upload: {
                   action: 'https://www.fastmock.site/mock/00eedc89915e3d2f6aeb2df2c2ed7aa7/canknow/upload',
                      resultParse(response) {
                          return response.result.path;
                      }
                  }
              }
          }
        },
        methods: {
        },
        mounted () {
            setTimeout(() => {
                this.value = '<p>test after 3s</p>';
            }, 3000);
        }
    };
</script>
```
:::