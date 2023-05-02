## Breadcrumb

Displays the location of the current page, making it easier to browser back.

### Basic usage


:::demo In `breadcrumb`, each `breadcrumb-item` is a tag that stands for every level starting from homepage. This component has a `String` attribute `separator`, and it determines the separator. Its default value is '/'.

```html
<c-breadcrumb>
  <c-breadcrumb-item :to="{ path: '/' }">homepage</c-breadcrumb-item>
  <c-breadcrumb-item><a href="/">promotion management</a></c-breadcrumb-item>
  <c-breadcrumb-item>promotion list</c-breadcrumb-item>
  <c-breadcrumb-item>promotion detail</c-breadcrumb-item>
</c-breadcrumb>
```
:::


