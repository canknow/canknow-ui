## Menu

:::demo

```html
<c-menu theme="dark" :default-active="activeIndex" class="menu-demo" mode="horizontal" @select="handleSelect">
  <c-menu-item index="1"><span class="c-menu-item-title">Navigation One</span></c-menu-item>
  <c-submenu index="2">
    <template slot="title"><span class="c-menu-item-title">Navigation Two</span></template>
    <c-menu-item index="2-1"><span class="c-menu-item-title">Option 1</span></c-menu-item>
    <c-menu-item index="2-2"><span class="c-menu-item-title">Option 2</span></c-menu-item>
    <c-menu-item index="2-3"><span class="c-menu-item-title">Option 3</span></c-menu-item>
    <c-submenu index="2-4">
      <template slot="title"><span class="c-menu-item-title">Option 4</span></template>
      <c-menu-item index="2-4-1"><span class="c-menu-item-title">Option 1</span></c-menu-item>
      <c-menu-item index="2-4-2"><span class="c-menu-item-title">Option 2</span></c-menu-item>
      <c-menu-item index="2-4-3"><span class="c-menu-item-title">Option 3</span></c-menu-item>
    </c-submenu>
  </c-submenu>
  <c-menu-item index="3" disabled><span class="c-menu-item-title">Navigation Three</span></c-menu-item>
  <c-menu-item index="4"><a href="https://www.ele.me" target="_blank"><span class="c-menu-item-title">Navigation Four</span></a></c-menu-item>
</c-menu>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```
:::

:::demo

```html
<c-menu :default-active="activeIndex" class="menu-demo" mode="horizontal" @select="handleSelect">
  <c-menu-item index="1"><span class="c-menu-item-title">Navigation One</span></c-menu-item>
  <c-submenu index="2">
    <template slot="title"><span class="c-menu-item-title">Navigation Two</span></template>
    <c-menu-item index="2-1"><span class="c-menu-item-title">Option 1</span></c-menu-item>
    <c-menu-item index="2-2"><span class="c-menu-item-title">Option 2</span></c-menu-item>
    <c-menu-item index="2-3"><span class="c-menu-item-title">Option 3</span></c-menu-item>
    <c-submenu index="2-4">
      <template slot="title"><span class="c-menu-item-title">Option 4</span></template>
      <c-menu-item index="2-4-1"><span class="c-menu-item-title">Option 1</span></c-menu-item>
      <c-menu-item index="2-4-2"><span class="c-menu-item-title">Option 2</span></c-menu-item>
      <c-menu-item index="2-4-3"><span class="c-menu-item-title">Option 3</span></c-menu-item>
    </c-submenu>
  </c-submenu>
  <c-menu-item index="3" disabled><span class="c-menu-item-title">Navigation Three</span></c-menu-item>
  <c-menu-item index="4"><a href="https://www.ele.me" target="_blank"><span class="c-menu-item-title">Navigation Four</span></a></c-menu-item>
</c-menu>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```
:::

:::demo
```html
<c-radio-group v-model="isCollapse">
  <c-radio :value="false">展开</c-radio>
  <c-radio :value="true">收起</c-radio>
</c-radio-group>
<c-switch v-model="theme" true-value="dark" false-value="light"></c-switch>
<div>
<c-menu :theme="theme" default-active="1-4-1" class="menu-vertical-demo component-span-top" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <c-menu-item index="1">
    <icon name="menu" class="c-menu-item-icon"></icon>
    <span class="c-menu-item-title" slot="title">导航一</span>
  </c-menu-item>
   <c-submenu index="2">
      <template slot="title">
        <icon name="location" class="c-menu-item-icon"></icon>
        <span class="c-menu-item-title">导航二</span>
      </template>
      <c-submenu index="2-4">
        <span class="c-menu-item-title" slot="title">选项4</span>
        <c-menu-item index="2-4-1"><span class="c-menu-item-title">选项2</span></c-menu-item>
      </c-submenu>
    </c-submenu>
  <c-menu-item index="3" disabled>
    <icon name="global" class="c-menu-item-icon"></icon>
    <span class="c-menu-item-title" slot="title">导航三</span>
  </c-menu-item>
  <c-menu-item index="4">
    <icon name="setting" class="c-menu-item-icon"></icon>
    <span class="c-menu-item-title" slot="title">导航四</span>
  </c-menu-item>
  <c-submenu index="5">
      <template slot="title">
        <icon name="location" class="c-menu-item-icon"></icon>
        <span class="c-menu-item-title">导航二</span>
      </template>
      <c-submenu index="5-4">
        <span class="c-menu-item-title" slot="title">选项4</span>
        <c-menu-item index="5-4-1"><span class="c-menu-item-title">选项2</span></c-menu-item>
      </c-submenu>
    </c-submenu>
</c-menu>
</div>

<style>
  .menu-vertical-demo:not(.collapse) {
    width: 200px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
          theme: 'dark'
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

```
:::

### Menu Attribute
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| mode     | menu display mode   | string  |   horizontal / vertical   | vertical |
| collapse  | whether the menu is collapsed (available only in vertical mode) | boolean  |   —   | false |
| background-color  | background color of Menu (hex format) | string |   —   | #ffffff |
| text-color  | text color of Menu (hex format) | string |   —   | #303133 |
| active-text-color  | text color of currently active menu item (hex format) | string |   —   | #409EFF |
| default-active | index of currently active menu | string    | — | — |
| default-openeds | array that contains indexes of currently active sub-menus  | Array    | — | — |
| unique-opened  |  whether only one sub-menu can be active  | boolean   | — | false   |
| menu-trigger | how sub-menus are triggered, only works when `mode` is 'horizontal' | string    | hover / click | hover |
| router  | whether `vue-router` mode is activated. If true, index will be used as 'path' to activate the route action | boolean   | — | false   |
| collapse-transition  | whether to enable the collapse transition | boolean   | — | true   |

### Menu Methods
| Methods Name | Description | Parameters |
|---------- |-------- |---------- |
| open  | open a specific sub-menu | index: index of the sub-menu to open |
| close  | close a specific sub-menu | index: index of the sub-menu to close |

### Menu Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| select  | callback function when menu is activated | index: index of activated menu, indexPath: index path of activated menu  |
| open  | callback function when sub-menu expands | index: index of expanded sub-menu, indexPath: index path of expanded sub-menu |
| close  | callback function when sub-menu collapses | index: index of collapsed sub-menu, indexPath: index path of collapsed sub-menu |

### Menu-Item Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| click  | callback function when menu-item is clicked | el: menu-item instance  |

### SubMenu Attribute
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| index     | unique identification   | string  | — | — |
| popper-class | custom class name for the popup menu | string | — | — |
| show-timeout | timeout before showing a sub-menu | number | — | 300 |
| hide-timeout | timeout before hiding a sub-menu | number | — | 300 |
| disabled | whether the sub-menu is disabled | boolean | — | false |
| popper-append-to-body | whether to append the popup menu to body. If the positioning of the menu is wrong, you can try setting this prop | boolean | - | level one Submenu: true / other Submenus: false |

### Menu-Item Attribute
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| index     | unique identification   | string/null  | — | null |
| route     | Vue Router object   | object | — | — |
| disabled | whether disabled | boolean | — | false |

### Menu-Group Attribute
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------- |---------- |-------------  |-------- |
| title     | group title   | string  | — | — |
