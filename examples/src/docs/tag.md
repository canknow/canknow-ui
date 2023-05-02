## Tag

Used for marking and selection.

### Basic usage

:::demo Use the `type` attribute to define Tag's type. In addition, the `color` attribute can be used to set the background color of the Tag.

```html
<c-tag>Tag 1</c-tag>
<c-tag scene="success">Tag 2</c-tag>
<c-tag scene="info">Tag 3</c-tag>
<c-tag scene="warning">Tag 4</c-tag>
<c-tag scene="danger">Tag 5</c-tag>
```
:::

### Removable Tag

:::demo `closable` attribute can be used to define a removable tag. It accepts a `Boolean`. By default the removal of Tag has a fading animation. If you don't want to use it, you can set the `disable-transitions` attribute, which accepts a `Boolean`, to `true`. `close` event triggers when Tag is removed.

```html
<c-tag
  v-for="tag in tags"
  :key="tag.name"
  closable
  :scene="tag.type">
  {{tag.name}}
</c-tag>

<script>
  export default {
    data() {
      return {
        tags: [
          { name: 'Tag 1', type: '' },
          { name: 'Tag 2', type: 'success' },
          { name: 'Tag 3', type: 'info' },
          { name: 'Tag 4', type: 'warning' },
          { name: 'Tag 5', type: 'danger' }
        ]
      };
    }
  }
</script>
```
:::

### Edit Dynamically

You can use the `close` event to add and remove tag dynamically.

:::demo
```html
<c-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</c-tag>
<c-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm">
</c-input>
<c-button v-else class="button-new-tag" @click="showInput">+ New Tag</c-button>

<style>
  .tag + .tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
  export default {
    data() {
      return {
        dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
```
:::

### Sizes

Besides default size, Tag component provides three additional sizes for you to choose among different scenarios.

:::demo Use attribute `size` to set additional sizes with `medium`, `small` or `large`.

```html
<c-tag>Default</c-tag>
<c-tag size="large">Large</c-tag>
<c-tag size="small">Small</c-tag>
<c-tag size="medium">medium</c-tag>
```
:::


### Theme

Tag provide three different themes: `dark`、`light` and `plain`

:::demo Using `effect` to change, default is `light`
```html
<div class="tag-group">
  <span class="tag-group-title">Dark</span>
  <c-tag
    v-for="item in items"
    :key="item.label"
    :scene="item.type"
    border>
    {{ item.label }}
  </c-tag>
</div>
<div class="tag-group">
  <span class="tag-group-title">Plain</span>
  <c-tag
    v-for="item in items"
    :key="item.label"
    :scene="item.type"
    :fill="false"
    border>
    {{ item.label }}
  </c-tag>
</div>

<script>
  export default {
    data() {
      return {
        items: [
          { type: '', label: 'Tag 1' },
          { type: 'success', label: 'Tag 2' },
          { type: 'info', label: 'Tag 3' },
          { type: 'danger', label: 'Tag 4' },
          { type: 'warning', label: 'Tag 5' }
        ]
      }
    }
  }
</script>
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | component type | string | success/info/warning/danger | — |
| closable | whether Tag can be removed | boolean | — | false |
| disable-transitions | whether to disable animations | boolean | — | false |
| hit | whether Tag has a highlighted border | boolean | — | false |
| color | background color of the Tag | string | — | — |
| size | tag size | string | small / medium / large | — |
| effect | component theme | string | dark / light / plain | light |


### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| click | triggers when Tag is clicked | — |
| close | triggers when Tag is removed | — |
