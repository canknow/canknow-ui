## Empty

Placeholder hints for empty states.

### Basic usage

:::demo

```html
<c-empty description="description"></c-empty>
```
:::

### Custom image

Use `image` prop to set image URL.

:::demo

```html
<c-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></c-empty>
```
:::

### Image size

Use `image-size` prop to control image size.

:::demo

```html
<c-empty :image-size="200"></c-empty>
```
:::

### Bottom content

Use the default slot to insert content at the bottom.

:::demo
```html
<c-empty>
  <c-button scene="primary">Button</c-button>
</c-empty>
```
:::

### Empty Attributes
| Attribute       | Description      | Type         | Acceptable Value    | Default   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| image          | image URL       | string  |          —             |    —     |
| image-size    | image size (width)  | number | — |    —  |
| description  | description    | string  |    —  |  — |

### Empty Slots

| Name | Description |
|------|--------|
| default | Custom bottom content  |
| image | Custom image     |
| description | Custom description     |