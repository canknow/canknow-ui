## Grid

Quickly and easily create grids with the basic 24-column.

### Basic grid

Create basic grid grid using columns.

:::demo With `row` and `column`, we can easily manipulate the grid using the `span` attribute.
```html
<c-row>
  <c-column :span="24"><div class="grid-content"></div></c-column>
</c-row>
<c-row>
  <c-column :span="12"><div class="grid-content"></div></c-column>
  <c-column :span="12"><div class="grid-content"></div></c-column>
</c-row>
<c-row>
  <c-column :span="8"><div class="grid-content"></div></c-column>
  <c-column :span="8"><div class="grid-content"></div></c-column>
  <c-column :span="8"><div class="grid-content"></div></c-column>
</c-row>
<c-row>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
</c-row>
<c-row>
  <c-column :span="4"><div class="grid-content"></div></c-column>
  <c-column :span="4"><div class="grid-content"></div></c-column>
  <c-column :span="4"><div class="grid-content"></div></c-column>
  <c-column :span="4"><div class="grid-content"></div></c-column>
  <c-column :span="4"><div class="grid-content"></div></c-column>
  <c-column :span="4"><div class="grid-content"></div></c-column>
</c-row>
```
:::

### Column spacing

Column spacing is supported.

:::demo Row provides `gutter` attribute to specify spacings between columns, and its default value is 0.
```html
<c-row :gutter="1">
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
</c-row>

```
:::

### Hybrid grid

Form a more complex hybrid grid by combining the basic 1/24 columns.

:::demo
```html
<c-row :gutter="1">
  <c-column :span="16"><div class="grid-content"></div></c-column>
  <c-column :span="8"><div class="grid-content"></div></c-column>
</c-row>
<c-row :gutter="1">
  <c-column :span="8"><div class="grid-content"></div></c-column>
  <c-column :span="8"><div class="grid-content"></div></c-column>
  <c-column :span="4"><div class="grid-content"></div></c-column>
  <c-column :span="4"><div class="grid-content"></div></c-column>
</c-row>
<c-row :gutter="1">
  <c-column :span="4"><div class="grid-content"></div></c-column>
  <c-column :span="16"><div class="grid-content"></div></c-column>
  <c-column :span="4"><div class="grid-content"></div></c-column>
</c-row>

```
:::

### Column offset

You can specify column offsets.

:::demo You can specify the number of column offset by setting the value of `offset` attribute of column.

```html
<c-row :gutter="1">
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6" :offset="6"><div class="grid-content"></div></c-column>
</c-row>
<c-row :gutter="1">
  <c-column :span="6" :offset="6"><div class="grid-content"></div></c-column>
  <c-column :span="6" :offset="6"><div class="grid-content"></div></c-column>
</c-row>
<c-row :gutter="1">
  <c-column :span="12" :offset="6"><div class="grid-content"></div></c-column>
</c-row>

```
:::

### Alignment

Use the flex grid to make flexible alignment of columns.

:::demo You can enable flex grid by setting `type` attribute to 'flex', and define the grid of child elements by setting `justify` attribute with start, center, end, space-between or space-around.
```html
<c-row type="flex" class="row-bg">
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
</c-row>
<c-row type="flex" class="row-bg" justify="center">
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
</c-row>
<c-row type="flex" class="row-bg" justify="end">
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
</c-row>
<c-row type="flex" class="row-bg" justify="space-between">
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
</c-row>
<c-row type="flex" class="row-bg" justify="space-around">
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
  <c-column :span="6"><div class="grid-content"></div></c-column>
</c-row>

```
:::

### Responsive Grid

Taking example by Bootstrap's responsive design, five breakpoints are preset: sm, md, lg.

:::demo
```html
<c-row :gutter="1">
  <c-column :xs="24" :sm="6" :md="4" :lg="3"><div class="grid-content"></div></c-column>
  <c-column :xs="24" :sm="6" :md="8" :lg="9"><div class="grid-content"></div></c-column>
  <c-column :xs="24" :sm="6" :md="8" :lg="9"><div class="grid-content"></div></c-column>
  <c-column :xs="24" :sm="6" :md="4" :lg="3"><div class="grid-content"></div></c-column>
</c-row>

```
:::

### Utility classes for hiding elements

Additionally, Element provides a series of classes for hiding elements under certain conditions. These classes can be added to any DOM elements or custom components. You need to import the following CSS file to use these classes:

The classes are:
- `hidden-sm-only` - hide when on small viewports and down
- `hidden-sm-and-down` - hide when on small viewports and down
- `hidden-sm-and-up` - hide when on small viewports and up
- `hidden-md-only` - hide when on medium viewports only
- `hidden-md-and-down` - hide when on medium viewports and down
- `hidden-md-and-up` - hide when on medium viewports and up
- `hidden-lg-only` - hide when on large viewports only

### Row Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | grid spacing | number | — | 0 |
| type | grid mode, you can use flex, works in modern browsers | string | — | — |
| justify | horizontal alignment of flex grid | string | start/end/center/space-around/space-between | start |
| align | vertical alignment of flex grid | string | top/middle/bottom | top |
| tag | custom element tag | string | * | div |

### Column Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span | number of column the grid spans | number | — | 24 |
| offset | number of spacing on the left side of the grid | number | — | 0 |
| push |  number of columns that grid moves to the right | number | — | 0 |
| pull |  number of columns that grid moves to the left | number | — | 0 |
| sm | `≥768px` Responsive columns or column props object | number/object (e.g. {span: 4, offset: 4}) | — | — |
| md | `≥992px` Responsive columns or column props object | number/object (e.g. {span: 4, offset: 4}) | — | — |
| lg | `≥1200px` Responsive columns or column props object | number/object (e.g. {span: 4, offset: 4}) | — | — |
| tag | custom element tag | string | * | div |


