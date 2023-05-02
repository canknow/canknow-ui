:::demo

```html
<template>
    <c-steps :current="current">
         <c-step v-for="(item, index) in activityList" :title="item.approveUserName" :key="index" :content="item.startTime"></c-step>
    </c-steps>
    <c-button @click="next">next</c-button>
</template> 
<script>
    export default {
        name: 'DocumentStep',
        data () {
            return {
                current: 0,
                activityList:[
                    {
                        approveUserName:'123',
                        startTime:'1'
                    },
                    {
                        approveUserName:'123',
                        startTime:'2'
                    },
                    {
                        approveUserName:'123',
                        startTime:'3'
                    }
                ]
            }
        },
        computed: {

        },
        methods: {
            next () {
                if (this.current == 2) {
                    this.current = 0;
                }
                else {
                    this.current += 1;
                }
            },
        },
    };
</script>
```
:::

:::demo

```html
<template>
     <c-steps current="1" status="error">
          <c-step v-for="(item, index) in activityList" :title="item.approveUserName" :key="index" :content="item.startTime"></c-step>
     </c-steps>
</template> 
<script>
    export default {
        name: 'DocumentStep',
        data () {
            return {
                current: 0,
                activityList:[
                    {
                        approveUserName:'123',
                        startTime:'1'
                    },
                    {
                        approveUserName:'123',
                        startTime:'2'
                    },
                    {
                        approveUserName:'123',
                        startTime:'3'
                    }
                ]
            }
        },
        computed: {

        },
        methods: {
            next () {
                if (this.current == 2) {
                    this.current = 0;
                }
                else {
                    this.current += 1;
                }
            },
        },
    };
</script>
```
:::