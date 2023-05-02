## Badge

A number or status mark on buttons and icons.

### Basic usage

Displays the amount of new messages.

:::demo The amount is defined with `value` which accepts `Number` or `String`.

```html
<c-badge :count="12" class="item">
  <c-button size="small">comments</c-button>
</c-badge>
<c-badge :count="3" class="item">
  <c-button size="small">replies</c-button>
</c-badge>
```
:::