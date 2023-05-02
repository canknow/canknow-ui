:::demo
```html
 <c-button @click="show">show</c-button>

<script>
    export default {
        methods: {
            show() {
                this.$Popup.popup({
                    className: 'build-popup',
                    render: (h) => {
                        return (
                            <div>
                                <div>
                                    test
                                </div>
                            </div>);
                    }
                })
            }
        }
    };
</script>
```
:::
