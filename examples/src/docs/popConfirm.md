## PopConfirm

A simple confirmation dialog of an element click action.

### Basic usage

PopConfirm is similar to Popover. So for some duplicated attributes, please refer to the documentation of Popover.

:::demo Only `title` attribute is available in PopConfirm, `content` will be ignored.
```html
<template>
<c-pop-confirm
  title="Are you sure to delete this?">
  <c-button slot="reference">Delete</c-button>
</c-pop-confirm>
</template>
````
:::

### Customise
You can customise PopConfirm like:
:::demo
```html
<template>
<c-pop-confirm
  confirm-button-text='OK'
  cancc-button-text='No, Thanks'
  icon="c-icon-info"
  icon-color="red"
  title="Are you sure to delete this?">
  <c-button slot="reference">Delete</c-button>
</c-pop-confirm>
</template>
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  title              | Title | String | — | — |
|  confirm-button-text              | Confirm button text | String | — | — |
|  cancc-button-text              | Cancel button text | String | — | — |
|  confirm-button-type              | Confirm button type | String | — | Primary |
|  cancc-button-type              | Cancel button type | String | — | Text |
|  icon              | Icon | String | — | c-icon-question |
|  icon-color              | Icon color | String | — | #f90 |
|  hide-icon              | is hide Icon | Boolean | — | false |

### Slot
| Name | Description |
|--- | ---|
| reference | HTML element that triggers Popconfirm |

### Events
| Event Name | Description | Parameters |
|---------|--------|---------|
| confirm | triggers when click confirm button | — |
| cancel | triggers when click cancel button | — |
