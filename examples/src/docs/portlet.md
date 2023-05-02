:::demo

```html
<template>
     <c-portlet icon="setting">
           <template slot="title">porlet</template>
           <template slot="actions"><c-button border circle>button 1</c-button><c-button border circle>button 2</c-button></template>
           <div>body</div>
     </c-portlet>
</template> 
```
:::

:::demo

```html
<template>
      <c-portlet :radius="true">
             <div>body</div>
      </c-portlet>
</template> 
```
:::