## Affix
:::demo

```html
<template>
    <div style="height: 2000px;">
        <div>
            <c-affix :offset-top="70" @change="onchange1">
                <c-button scene="primary">固定在距离顶部偏移量70px的位置</c-button>
            </c-affix>
        </div>
        <div class="height-em5"></div>
        <div>
            <c-affix :offset-top="120" @change="onchange2">
                <c-button scene="primary">固定在距离顶部偏移量120px的位置</c-button>
            </c-affix>
        </div>
        <div class="height-em5"></div>
        <div>
            <c-affix :offset-top="170" @change="onchange3">
                <c-button scene="primary">固定在距离顶部偏移量170px的位置</c-button>
            </c-affix>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: {
                    fixed1: false,
                    fixed2: false,
                    fixed3: false
                }
            };
        },
        methods: {
            onchange1(fixed) {
                this.status.fixed1 = fixed;
            },
            onchange2(fixed) {
                this.status.fixed2 = fixed;
            },
            onchange3(fixed) {
                this.status.fixed3 = fixed;
            }
        }
    };
</script>
```
:::
