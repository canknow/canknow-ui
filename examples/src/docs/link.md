## Link

Text hyperlink

### Basic

Basic text link
:::demo

```html
<div>
  <c-link href="https://element.eleme.io" target="_blank">default</c-link>
  <c-link scene="primary">primary</c-link>
  <c-link scene="success">success</c-link>
  <c-link scene="warning">warning</c-link>
  <c-link scene="danger">danger</c-link>
  <c-link scene="info">info</c-link>
</div>
```

:::

### Disabled

Disabled state of link
:::demo

```html
<div>
  <c-link disabled>default</c-link>
  <c-link scene="primary" disabled>primary</c-link>
  <c-link scene="success" disabled>success</c-link>
  <c-link scene="warning" disabled>warning</c-link>
  <c-link scene="danger" disabled>danger</c-link>
  <c-link scene="info" disabled>info</c-link>
</div>
```

:::

### Underline

Underline of link
:::demo

```html
<div>
  <c-link :underline="false">Without Underline</c-link>
  <c-link>With Underline</c-link>
</div>
```

:::

### Icon

Link with icon
:::demo

```html
<div>
  <c-link icon="edit">Edit</c-link>
</div>
```

:::

### Attributes

| Attribute | Description                         | Type    | Options                                     | Default |
| --------- | ----------------------------------- | ------- | ------------------------------------------- | ------- |
| type      | type                                | string  | primary / success / warning / danger / info | default |
| underline | whether the component has underline | boolean | —                                           | true    |
| disabled  | whether the component is disabled   | boolean | —                                           | false   |
| href      | same as native hyperlink's `href`   | string  | —                                           | -       |
| icon      | class name of icon                  | string  | —                                           | -       |
