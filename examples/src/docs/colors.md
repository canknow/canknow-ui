## Colors

### Scene colors
:::demo
```html
<template>
    <div>
        <h2>Scene colors</h2>
        <c-row :gutter="1">
            <c-column class="margin-bottom-1" :span="6" v-for="color in sceneColors" :key="color">
                <c-card :class="[`background-color-${color}`, 'text-color-white']">
                    {{color}}
                </c-card>
            </c-column>
        </c-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sceneColors: ['primary', 'success', 'error', 'info']
            };
        }
    };
</script>
<style lang="scss">
    @import "../styles/helpers.scss";
    .color-layer {
        .app-box {
            width: 20rem;
            height: 20rem;
            background: $app-color;
        
            .component-box {
                background: $component-background;
            }
        }
    }
</style>
```
:::

### text color
:::demo
```html
<template>
    <c-row gutter="1">
        <c-column class="margin-bottom-1" :span="6" v-for="color in textColors" :key="color">
            <span :class="[`text-color-${color}`]">{{color}}</span>
        </c-column>
    </c-row>
</template>
<script>
    export default {
        data() {
            return {
                textColors: ['title', 'content', 'paragraph', 'placeholder', 'info', 'disabled', 'property'],
            };
        }
    };
</script>
```
:::

:::demo
```html
<template>
    <h2>Color layer</h2>
    <div class="color-layer">
        <div class="app-box content-padding">
            <div class="component-box height-full border-bottom">
                <c-input placeholder="input"></c-input>
            </div>
        </div>
    </div>
</template>
```
:::
