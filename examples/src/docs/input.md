## Input

Input data using mouse or keyboard.

### Basic usage
:::demo
```html
<template>
    <div class="margin-bottom-1">
        <c-input v-model="test" value="static text"><template slot="append">.com</template></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input circle v-model="test" value="static text"><template slot="append">.com</template></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input circle v-model="test" value="static text"><template slot="prepend">.com</template></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input circle v-model="test" value="static text"></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input endIcon="user" v-model="test" clearable><span slot="prepend">Https://</span></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input custom-prepend><c-button slot="prepend" scene="primary">submit</c-button></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input custom-append><c-button slot="append" scene="primary">submit</c-button></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input custom-append><c-select slot="append" v-model="test"><c-option value="1" label="item 1"></c-option></c-select></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input custom-prepend><c-select slot="prepend" v-model="test"><c-option value="1" label="item 1"></c-option></c-select></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input><template slot="prefix">￥</template></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input><template slot="suffix">￥</template></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input type="static" value="static text"></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input type="textarea" value="textarea"></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input :clearable="true"></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input line :clearable="true"></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input disabled value="disabled"></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input size="small"></c-input>
        <c-input size="medium"></c-input>
        <c-input size="large"></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input front-icon="user" show-password></c-input>
        <c-input end-icon="user"></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input><icon name="user" slot="suffix"</icon></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input><icon name="user" slot="suffix"</icon></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input custom-append><c-button scene="primary" icon="search" slot="append">button</c-button></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input clearable></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input radius></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input small-radius></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input maxlength="10" show-word-limit></c-input>
    </div>
    <div class="margin-bottom-1">
        <c-input type="textarea" maxlength="20" show-word-limit></c-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                test: 'test'
            };
        }
    };
</script>
```
:::
