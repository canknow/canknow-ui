## Icon

Canknow provides a set of common icons.

### Basic usage

:::demo
```html
<icon name="edit"></icon>
<icon name="share"></icon>
<icon name="delete"></icon>
<c-button scene="primary" icon="search">Search</c-button>
```
:::

### Icons

:::demo

```html

<template>
    <div class="icon-group margin-bottom-1" v-for="iconGroup in icons">
        <c-card :title="iconGroup.name">
            <ul class="icon-list">
                <li v-for="iconName in iconGroup.items" :key="iconName" v-copy :data-clipboard-text="iconName">
                    <div>
                        <icon :name="iconName" :package="iconGroup.name"></icon>
                        <span class="icon-name">{{iconName}}</span>
                    </div>
                </li>
            </ul>
        </c-card>
    </div>
</template>
<script>
    const icons = require('./../../icon.json');

    export default {
        data() {
            return {
                icons
            };
        }
    }
</script>
```
:::
