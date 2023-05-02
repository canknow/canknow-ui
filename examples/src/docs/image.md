## Image

:::demo
```html
<div class="demo-image-list">
  <div class="demo-image-item" v-for="fit in fits" :key="fit">
    <span class="demo-image-demonstration">{{ fit }}</span>
    <c-image
      width="100"
      height="100"
      :previewImages="previewImages"
      :src="url"
      :fit="fit"></c-image>
  </div>
</div>
<script>
  export default {
    data() {
      return {
        previewImages: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
</script>
```
:::

:::demo
```html
<div class="demo-image-list">
  <div class="demo-image-item">
    <span class="demo-image-demonstration">默认</span>
    <c-image style="width: 100px; height: 100px;"></c-image>
  </div>
  <div class="demo-image-item">
    <span class="demo-image-demonstration">自定义</span>
    <c-image style="width: 100px; height: 100px;">
      <div slot="error" class="image-slot">
        <icon name="picture"></icon>
      </div>
    </c-image>
  </div>
</div>
<script>
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
</script>
```
:::


### Attributes
| Attribute | Description | Type  | Accepted values | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| src | Image source, same as native | string | — | - |
| fit | Indicate how the image should be resized to fit its container, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string | fill / contain / cover / none / scale-down | - |
| alt | Native alt | string | - | - |
| referrer-policy | Native referrerPolicy | string | - | - |
| lazy | Whether to use lazy load | boolean | — | false |
| scroll-container | The container to add scroll listener when using lazy load | string / HTMLElement | — | The nearest parent container whose overflow property is auto or scroll |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| load | Same as native load | (e: Event) |
| error | Same as native error | (e: Error) |

### Slots
| Slot Name | Description |
|---------|-------------|
| placeholder | Triggers when image load |
| error | Triggers when image load failed |

