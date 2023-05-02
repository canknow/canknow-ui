:::demo

```html
<template>
    <div>
        <c-page-header page-title="application title" :menu-list="menus">
            <div class="page-header-right-wrap">
                <c-dropdown class="user-block-dropdown margin-right-1">
                    <div class="user-block">
                        <div class="user-info">
                            <h3>canknow</h3>
                            <h4>3230525823@qq.com</h4>
                        </div>
                        <online-status :status="true">
                            <div class="user-avatar-wrap">
                                <img class="user-avatar" src="../assets/images/avatar.png"/>
                            </div>
                        </online-status>
                        <i class="dropdown-status-icon icon-down"></i>
                    </div>
                    <c-dropdown-menu slot="dropdown" class="user-block-dropdown">
                        <c-dropdown-menu-item title="item1"></c-dropdown-menu-item>
                        <c-dropdown-menu-item title="item2"></c-dropdown-menu-item>
                    </c-dropdown-menu>
                </c-dropdown>
            </div>
        </c-page-header>
        <c-page-header theme="color" page-title="application title" :menu-list="menus" class="background-color-primary">
            <div class="page-header-right-wrap">
                <c-dropdown class="user-block-dropdown margin-right-1">
                    <div class="user-block">
                        <div class="user-info">
                            <h3>canknow</h3>
                            <h4>3230525823@qq.com</h4>
                        </div>
                        <c-online-status :status="true">
                            <div class="user-avatar-wrap">
                                <img class="user-avatar" src="../assets/images/avatar.png"/>
                            </div>
                        </c-online-status>
                        <i class="dropdown-status-icon icon-down"></i>
                    </div>
                    <c-dropdown-menu slot="dropdown" class="user-block-dropdown">
                        <c-dropdown-menu-item title="item1"></c-dropdown-menu-item>
                        <c-dropdown-menu-item title="item2"></c-dropdown-menu-item>
                    </c-dropdown-menu>
                </c-dropdown>
            </div>
        </c-page-header>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menus: [
                    {
                        icon: 'user',
                        title: 'item 1',
                        name: 'item1',
                    },
                    {
                        icon: 'user',
                        title: 'item 2',
                        name: 'item2',
                    }
                ]
            };
        }
    }
</script>
```
:::
