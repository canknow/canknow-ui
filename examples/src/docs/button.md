## Form

:::demo
```html
<c-button :to="{ path: '/index' }" icon="download">default</c-button>
<c-button scene="dark" icon="download">dark</c-button>
<c-button scene="light" icon="download">light</c-button>
<c-button scene="primary" icon="download">primary</c-button>
<c-button scene="secondary" icon="download">secondary</c-button>
<c-button scene="info" icon="download">info</c-button>
<c-button scene="success" icon="download">success</c-button>
<c-button scene="warning" icon="download">warning</c-button>
<c-button scene="danger" icon="download">danger</c-button>
<c-button scene="default" icon="download">default</c-button>
```
:::

:::demo
```html
<c-button bold scene="primary" icon="download">primary</c-button>
<c-button loading bold scene="primary" icon="download">primary</c-button>
```
:::

:::demo
```html
<c-button plain scene="dark" icon="download">dark</c-button>
<c-button plain scene="light" icon="download">light</c-button>
<c-button plain scene="primary" icon="download">primary</c-button>
<c-button plain scene="secondary" icon="download">secondary</c-button>
<c-button plain scene="info" icon="download">info</c-button>
<c-button plain scene="success" icon="download">success</c-button>
<c-button plain scene="warning" icon="download">warning</c-button>
<c-button plain scene="danger" icon="download">danger</c-button>
<c-button plain scene="default" icon="download">default</c-button>
```
:::

:::demo
```html
<c-button scene="primary" disabled icon="download">primary</c-button>
```
:::

:::demo
```html
<c-button ghost :to="{ path: '/index' }" icon="download">default</c-button>
<c-button ghost scene="dark" icon="download">dark</c-button>
<c-button ghost scene="light" icon="download">light</c-button>
<c-button ghost scene="primary" icon="download">primary</c-button>
<c-button ghost scene="secondary" icon="download">secondary</c-button>
<c-button ghost scene="info" icon="download">info</c-button>
<c-button ghost scene="success" icon="download">success</c-button>
<c-button ghost scene="warning" icon="download">warning</c-button>
<c-button ghost scene="danger" icon="download">danger</c-button>
<c-button ghost scene="default" icon="download">default</c-button>
```
:::

:::demo
```html
<c-button type="icon" scene="dark" icon="download"></c-button>
<c-button type="icon" scene="light" icon="download"></c-button>
<c-button type="icon" scene="primary" icon="download"></c-button>
<c-button type="icon" scene="secondary" icon="download"></c-button>
<c-button type="icon" scene="info" icon="download"></c-button>
<c-button type="icon" scene="success" icon="download"></c-button>
<c-button type="icon" scene="warning" icon="download"></c-button>
<c-button type="icon" scene="danger" icon="download"></c-button>
<c-button type="icon" scene="default" icon="download"></c-button>
```
:::

### ghost icon
:::demo 
```html
<c-button ghost type="icon" scene="dark" icon="download"></c-button>
<c-button ghost type="icon" scene="light" icon="download"></c-button>
<c-button ghost type="icon" scene="primary" icon="download"></c-button>
<c-button ghost type="icon" scene="secondary" icon="download"></c-button>
<c-button ghost type="icon" scene="info" icon="download"></c-button>
<c-button ghost type="icon" scene="success" icon="download"></c-button>
<c-button ghost type="icon" scene="warning" icon="download"></c-button>
<c-button ghost type="icon" scene="danger" icon="download"></c-button>
<c-button ghost type="icon" scene="default" icon="download"></c-button>
```
:::

:::demo
```html
<c-button type="icon" icon="download" size="large"></c-button>
<c-button type="icon" icon="download" scene="dark" size="large"></c-button>
<c-button type="icon" icon="download" scene="light" size="large"></c-button>
<c-button type="icon" icon="download" scene="primary" size="large"></c-button>
<c-button type="icon" icon="download" scene="secondary" size="large"></c-button>
<c-button type="icon" icon="download" scene="info" size="large"></c-button>
<c-button type="icon" icon="download" scene="success" size="large"></c-button>
<c-button type="icon" icon="download" scene="warning" size="large"></c-button>
<c-button type="icon" icon="download" scene="danger" size="large"></c-button>
<c-button type="icon" icon="download" scene="default" size="large"></c-button>
```
:::

:::demo
```html
<c-button type="icon" border circle scene="dark" icon="download"></c-button>
<c-button type="icon" border circle scene="light" icon="download"></c-button>
<c-button type="icon" border circle scene="primary" icon="download"></c-button>
<c-button type="icon" border circle scene="secondary" icon="download"></c-button>
<c-button type="icon" border circle scene="info" icon="download"></c-button>
<c-button type="icon" border circle scene="success" icon="download"></c-button>
<c-button type="icon" border circle scene="warning" icon="download"></c-button>
<c-button type="icon" border circle scene="danger" icon="download"></c-button>
<c-button type="icon" border circle scene="default" icon="download"></c-button>
```
:::

:::demo
```html
<c-button type="icon" fill circle scene="dark" icon="download"></c-button>
<c-button type="icon" fill circle scene="light" icon="download"></c-button>
<c-button type="icon" fill circle scene="primary" icon="download"></c-button>
<c-button type="icon" fill circle scene="secondary" icon="download"></c-button>
<c-button type="icon" fill circle scene="info" icon="download"></c-button>
<c-button type="icon" fill circle scene="success" icon="download"></c-button>
<c-button type="icon" fill circle scene="warning" icon="download"></c-button>
<c-button type="icon" fill circle scene="danger" icon="download"></c-button>
<c-button type="icon" fill circle scene="default" icon="download"></c-button>
```
:::

:::demo
```html
<c-button scene="primary" icon="download" :syncing="syncing" @click="()=>{ syncing = !syncing }">default</c-button>
<c-button scene="primary" icon="download" :loading="true">default</c-button>
<script>
    export default {
        data () {
            return {
                syncing: false
            }
        }
    };
</script>
```
:::

:::demo
```html
<c-button scene="primary" icon="download" block>block button</c-button>
```
:::

:::demo
```html
<c-button scene="primary" icon="download" small-radius>primary</c-button>
<c-button scene="secondary" icon="download" small-radius>secondary</c-button>
<c-button scene="info" icon="download" small-radius>info</c-button>
<c-button scene="success" icon="download" small-radius>success</c-button>
<c-button scene="warning" icon="download" small-radius>warning</c-button>
<c-button scene="danger" icon="download" small-radius>danger</c-button>

```
:::

:::demo
```html
<template>
    <c-button v-ripple="true">default</c-button>
    <c-button scene="dark" v-ripple="true">dark</c-button>
    <c-button scene="primary" v-ripple="true">primary</c-button>
</template>
<script>
    export default {
        data () {
            return {
                synching: false
            }
        }
    };
</script>
```
:::

:::demo
```html
<c-button icon="download" ghost>default</c-button>
<c-button icon="download" scene="dark" ghost>dark</c-button>
<c-button icon="download" scene="light" ghost>light</c-button>
<c-button icon="download" scene="primary" ghost>primary</c-button>
<c-button icon="download" scene="secondary" ghost>secondary</c-button>
<c-button icon="download" scene="info" ghost>info</c-button>
<c-button icon="download" scene="success" ghost>success</c-button>
<c-button icon="download" scene="warning" ghost>warning</c-button>
<c-button icon="download" scene="danger" ghost>danger</c-button>
<c-button icon="download" scene="default" ghost>default</c-button>
```
:::

:::demo
```html
<c-button border circle>default</c-button>
<c-button scene="dark" border circle>dark</c-button>
<c-button scene="light" border circle>light</c-button>
<c-button scene="primary" border circle>primary</c-button>
<c-button scene="secondary" border circle>secondary</c-button>
<c-button scene="info" border circle>info</c-button>
<c-button scene="success" border circle>success</c-button>
<c-button scene="warning" border circle>warning</c-button>
<c-button scene="danger" border circle>danger</c-button>
<c-button scene="default" border circle>default</c-button>
```
:::

:::demo
```html
<c-button border dashed circle>default</c-button>
<c-button scene="dark" border dashed circle>dark</c-button>
<c-button scene="light" border dashed circle>light</c-button>
<c-button scene="primary" border dashed circle>primary</c-button>
<c-button scene="secondary" border dashed circle>secondary</c-button>
<c-button scene="info" border dashed circle>info</c-button>
<c-button scene="success" border dashed circle>success</c-button>
<c-button scene="warning" border dashed circle>warning</c-button>
<c-button scene="danger" border dashed circle>danger</c-button>
<c-button scene="default" border dashed circle>default</c-button>
```
:::

:::demo
```html
<c-button scene="default" size="smaller">smaller</c-button>
<c-button scene="default" size="small">small</c-button>
<c-button scene="default">medium</c-button>
<c-button scene="default" size="large">large</c-button>
<c-button scene="default" size="larger">larger</c-button>
```
:::

:::demo
```html
<c-button scene="default" size="small">small1</c-button>
<c-button scene="default" size="small">small2</c-button>
<c-button scene="default" size="small">small3</c-button>
```
:::

:::demo
```html
<button-group>
<c-button scene="default">default</c-button>
<c-button scene="primary">primary</c-button>
<c-button scene="primary">primary</c-button>
<c-button scene="primary">primary</c-button>
</button-group>
```
:::

:::demo
```html
<button-group>
<c-button size="small" scene="default">default</c-button>
<c-button size="small" scene="primary">primary</c-button>
<c-button size="small" scene="primary">primary</c-button>
<c-button size="small" scene="primary">primary</c-button>
</button-group>
```
:::

:::demo
```html
<button-group>
<c-button icon="download" scene="default"></c-button>
<c-button icon="download" scene="default"></c-button>
</button-group>
```
:::
