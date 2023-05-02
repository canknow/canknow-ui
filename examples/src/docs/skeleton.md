:::demo
```html
<template>
     <c-skeleton></c-skeleton>
</template>
```
:::

:::demo
```html
<template>
     <c-skeleton avatar :paragraph="{ rows: 4 }"></c-skeleton>
</template>
```
:::

:::demo
```html
<template>
     <c-skeleton active></c-skeleton>
</template>
```
:::

:::demo
```html
<template>
  <div>
    <c-space class="component-span-bottom">
      <c-skeleton-button :active="active" :size="size" :shape="buttonShape" />
      <c-skeleton-button :active="active" :size="size" :shape="buttonShape" />
      <c-skeleton-avatar :active="active" :size="size" :shape="avatarShape" />
      <c-skeleton-input :style="{ width: '200px' }" :active="active" :size="size" />
    </c-space>
    <c-divider />
    <c-form type="inline" class="component-span-top">
      <c-form-item label="active">
        <c-switch v-model="active"/>
      </c-form-item>
      <c-form-item label="size">
        <c-radio-group v-model="size">
          <c-radio type="button" value="medium">medium</c-radio>
          <c-radio type="button" value="small">small</c-radio>
          <c-radio type="button" value="large">large</c-radio>
        </c-radio-group>
      </c-form-item>
      <c-form-item label="button shape">
        <c-radio-group v-model="buttonShape">
          <c-radio type="button" value="default">default</c-radio>
          <c-radio type="button" value="round">round</c-radio>
          <c-radio type="button" value="circle">circle</c-radio>
        </c-radio-group>
      </c-form-item>
      <c-form-item label="avatar shape">
        <c-radio-group v-model="avatarShape">
          <c-radio type="button" value="square">square</c-radio>
          <c-radio type="button" value="circle">circle</c-radio>
        </c-radio-group>
      </c-form-item>
    </c-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false,
      size: 'medium',
      buttonShape: 'default',
      avatarShape: 'circle',
    };
  }
}
</script>
```
:::
