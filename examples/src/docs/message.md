:::demo

```html
<template>
    <div>
        <div>
            <div>
                <c-button @click.native="info">Show Info</c-button>
                <c-button @click.native="success">Show Success</c-button>
                <c-button @click.native="warning">Show Warning</c-button>
                <c-button @click.native="error">Show Error</c-button>
                <c-button @click.native="destroy">Destory</c-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DocumentMessage',
        methods: {
            info () {
                this.$Message.info({
                    content: 'This is a info message',
                    duration: 500000,
                    onClose () {
                    },
                    closable: true
                })
            },
            success () {
                this.$Message.success({
                    content: 'This is a success message',
                    duration: 500000
                });
            },
            warning () {
                this.$Message.warning({
                    content: 'This is a warning message',
                    invasive: false
                });
            },
            error () {
                this.$Message.error('This is a error message');
            },
            destroy () {
                this.$Message.closeAll();
            }
        },
    };
</script>
```
:::
