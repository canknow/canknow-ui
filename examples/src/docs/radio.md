:::demo
```html
<template>
     <c-radio v-model="single">radio</c-radio>
</template> 
<script>
    export default {
        data() {
            return {
                single: false,
                fruit: 'orange'
            }
        }
    };
</script>
```
:::

:::demo
```html
<template>
     <c-radio-group v-model="fruit">
           <c-radio value="orange">orange</c-radio>
           <c-radio value="apple">apple</c-radio>
           <c-radio value="banana">banana</c-radio>
     </c-radio-group>
</template> 
<script>
    export default {
        data() {
            return {
                fruit: 'orange',
            }
        }
    };
</script>
```
:::

:::demo
```html
<template>
     <c-radio-group v-model="fruit">
           <c-radio type="button" value="orange">orange</c-radio>
           <c-radio type="button" value="apple">apple</c-radio>
           <c-radio type="button" value="banana">banana</c-radio>
     </c-radio-group>
     <c-radio-group v-model="fruit" size="small">
           <c-radio type="button" value="orange">orange</c-radio>
           <c-radio type="button" value="apple">apple</c-radio>
           <c-radio type="button" value="banana">banana</c-radio>
     </c-radio-group>
     <c-radio-group v-model="fruit" size="large">
           <c-radio type="button" value="orange">orange</c-radio>
           <c-radio type="button" value="apple">apple</c-radio>
           <c-radio type="button" value="banana">banana</c-radio>
     </c-radio-group>
</template> 
<script>
    export default {
        data() {
            return {
                fruit: 'orange',
            }
        }
    };
</script>
```
:::
