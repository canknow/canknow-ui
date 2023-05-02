## Drawer

### Basic usage

:::demo

```html
<template>
    <c-button @click="value1 = true" scene="primary">Open right</c-button>
    <c-button @click="value2 = true" scene="primary">Open left</c-button>
    <c-drawer title="Basic Drawer" :closable="true" v-model="value1">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </c-drawer>
    <c-rawer title="Basic Drawer" placement="left" :closable="false" v-model="value2">
         <p>Some contents...</p>
         <p>Some contents...</p>
         <p>Some contents...</p>
    </c-rawer>
</template>
<script>
    export default {
        data () {
            return {
                value1: false,
                value2: false
            }
        }
    }
</script>
```
:::
