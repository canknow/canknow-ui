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
        name: 'DocumentNotify',
        methods: {
            info () {
                this.$Notify.info({
                    title: 'notify title',
                    content: 'This is a info notify',
                    duration: 5000,
                    onClose () {
                    },
                    closable: true
                })
            },
            success () {
                this.$Notify.success({
                    title: 'notify title',
                    content: 'This is a success notify',
                    duration: 4000
                });
            },
            warning () {
                this.$Notify.warning('This is a warning notify');
            },
            error () {
                this.$Notify.error({ title: 'notification', message: 'This is a error notify', duration: 0 });
            },
            destroy () {
                this.$Notify.closeAll();
            }
        },
    };
</script>
```
:::