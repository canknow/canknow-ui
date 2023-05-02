
:::demo
```html
<template>
  <c-timeline>
        <c-timeline-item>
            <p class="time">2019年4月12日</p>
            <p class="content">初始化bin-ui</p>
        </c-timeline-item>
        <c-timeline-item>
            <p class="time">2019年4月21日</p>
            <p class="content">发布1.1.0版本，新增几个基础组件</p>
        </c-timeline-item>
        <c-timeline-item>
            <p class="time">2019年7月24日</p>
            <p class="content">发布1.5.0版本，增加大量表单组件和常用组件</p>
        </c-timeline-item>
        <c-timeline-item>
            <p class="time">2019年8月23日</p>
            <p class="content">发布2.0.0版本，正式实现表格菜单等组件</p>
        </c-timeline-item>
  </c-timeline>
</template>

<script>
    export default {
        name: 'TimeLineDemo'
    }
</script>
```
:::

### 可以设置不同类型或者自定义颜色

用各种颜色来标识不同状态，可以使用success、info、warning, danger或自定义的颜色，默认是 primary 。

::: demo
```html
<template>
    <c-timeline>
        <c-timeline-item color="primary">发布1.0版本</c-timeline-item>
        <c-timeline-item color="info">发布1.5版本</c-timeline-item>
        <c-timeline-item color="warning">错误修复</c-timeline-item>
        <c-timeline-item color="danger">严重故障</c-timeline-item>
        <c-timeline-item color="success">发布2.0版本</c-timeline-item>
        <c-timeline-item color="#ff30b5">里程碑发布</c-timeline-item>
    </c-timeline>
</template>
```
:::

### 最后一个节点设置

通过添加pending属性来标记最后一个为节点

::: demo
```html
<template>
    <c-timeline pending>
        <c-timeline-item>发布1.0版本</c-timeline-item>
        <c-timeline-item>发布1.5版本</c-timeline-item>
        <c-timeline-item>发布2.0版本</c-timeline-item>
        <c-timeline-item>持续更新...</c-timeline-item>
    </c-timeline>
</template>
```
:::


### 自定义节点图标

默认是空心远点，可以自定义轴点图标

::: demo
```html
<template>
    <c-timeline>
        <c-timeline-item color="success">
          <icon name="user" slot="dot" size="14"></icon>
          <span>正式版上线</span>
        </c-timeline-item>
        <c-timeline-item>发布2.0版本</c-timeline-item>
        <c-timeline-item>发布1.5版本</c-timeline-item>
        <c-timeline-item>发布1.0版本</c-timeline-item>
    </c-timeline>
</template>
```
:::