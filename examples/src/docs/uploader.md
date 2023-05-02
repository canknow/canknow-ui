## Uploader

### single uploader
:::demo

```html
<template>
    <c-uploader action="https://www.fastmock.site/mock/00eedc89915e3d2f6aeb2df2c2ed7aa7/canknow/upload" 
                v-model="singleUploadValue" 
                :result-parse="resultParse" 
                show-upload-list
                base-url="http://localhost:21021">
         <c-button icon="user">Upload file</c-button>
    </c-uploader>
    <div>{{singleUploadValue}}</div>
</template>
<script>
    export default {
        data() {
           return {
              singleUploadValue: null
           };
        },
        methods: {
            resultParse(response) {
                return response.result.path;
            }
        }
    };
</script>
```
:::

### single picture uploader
:::demo

```html
<template>
    <c-uploader action="https://www.fastmock.site/mock/00eedc89915e3d2f6aeb2df2c2ed7aa7/canknow/upload" 
     v-model="singleUploadValue"
     type="image"
    :clearable="true"
    base-url="http://localhost:21021"></c-uploader>
    <div>{{singleUploadValue}}</div>
</template>
<script>
    export default {
        data() {
           return {
              singleUploadValue: null
           };
        }
    };
</script>
```
:::

### multiple uploader
:::demo

```html
<template>
    <c-uploader action="https://www.fastmock.site/mock/00eedc89915e3d2f6aeb2df2c2ed7aa7/canknow/upload" 
    :multiple="true"
     v-model="simpleUploadValue" 
    :result-parse="resultParse" 
    base-url="http://localhost:21021">
         <c-button icon="user">Upload files</c-button>
    </c-uploader>
    <div>{{simpleUploadValue}}</div>
</template>
<script>
    export default {
        data() {
           return {
              simpleUploadValue: null
           };
        },
        methods: {
            resultParse(response) {
                return response.result.path;
            }
        }
    };
</script>
```
:::

### pictures uploader
:::demo

```html
<template>
    <c-uploader
        multiple
        type="image"
        v-model="picturesUploadValue"
        action="https://www.fastmock.site/mock/00eedc89915e3d2f6aeb2df2c2ed7aa7/canknow/upload" :multiple="true" base-url="http://localhost:21021">
        <div>
            <icon name="upload" size="52"></icon>
            <p>Click or drag files here to upload</p>
        </div>
    </c-uploader>
    <div>{{picturesUploadValue}}</div>
</template> 
<script>
    export default {
        data() {
           return {
              picturesUploadValue: ["https://g.alicdn.com/teambition/web/teambition/images/tb-logo.62eaedbd.svg"]
           };
        }
    };
</script>
```
:::

### Click or drag uploader
:::demo

```html

<template>
    <c-uploader
            drag
            v-model="picturesUploadValue"
            action="https://www.fastmock.site/mock/00eedc89915e3d2f6aeb2df2c2ed7aa7/canknow/upload">
        <div class="c-uploader-helper">Click or drag files here to upload</div>
    </c-uploader>
</template>
<script>
    export default {
        data() {
            return {
                picturesUploadValue: ''
            };
        },
        methods: {
            resultParse(response) {
                return response.result.path;
            }
        }
    };
</script>
```
:::
