## Progress

Progress is used to show the progress of current operation, and inform the user the current status.

### Linear progress bar

:::demo Use `percent` attribute to set the percent. It's **required** and must be between `0-100`. You can custom text format by setting `format`.
```html
<c-progress :percentage="50"></c-progress>
<c-progress :percentage="50" :show-text="false"></c-progress>
<c-progress :percentage="100" :format="format"></c-progress>
<c-progress :percentage="100" status="success"></c-progress>
<c-progress :percentage="100" status="warning"></c-progress>
<c-progress :percentage="50" status="exception"></c-progress>

<script>
  export default {
    methods: {
      format(percent) {
        return percent === 100 ? 'Full' : `${percent}%`;
      }
    }
  };
</script>
```
:::

:::demo
```html
<c-progress type="step" :total-step="5" :current-step="3"></c-progress>
```
:::

### Internal percent

In this case the percent takes no additional space.

:::demo `stroke-width` attribute decides the `width` of progress bar, and use `text-inside` attribute to put description inside the progress bar.
```html
<c-progress class="component-span-bottom" :text-inside="true" :stroke-width="26" :percentage="70"></c-progress>
<c-progress class="component-span-bottom" :text-inside="true" :stroke-width="24" :percentage="100" status="success"></c-progress>
<c-progress class="component-span-bottom" :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></c-progress>
<c-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></c-progress>
```
:::

### Custom color

You can use `color` attr to set the progress bar color. it accepts color string, function, or array.

:::demo

```html
<c-progress :percentage="percent" :color="customColor"></c-progress>
<c-progress :percentage="percent" :color="customColorMethod"></c-progress>
<c-progress :percentage="percent" :color="customColors"></c-progress>
<div>
  <button-group>
    <c-button @click="decrease">+</c-button>
    <c-button @click="increase">-</c-button>
  </button-group>
</div>

<script>
  export default {
    data() {
      return {
        percent: 20,
        customColor: '#409eff',
        customColors: [
          {color: '#f56c6c', percent: 20},
          {color: '#e6a23c', percent: 40},
          {color: '#5cb87a', percent: 60},
          {color: '#1989fa', percent: 80},
          {color: '#6f7ad3', percent: 100}
        ]
      };
    },
    methods: {
      customColorMethod(percent) {
        if (percent < 30) {
          return '#909399';
        } 
        else if (percent < 70) {
          return '#e6a23c';
        }
        else {
          return '#67c23a';
        }
      },
      increase() {
        this.percent += 10;
        if (this.percent > 100) {
          this.percent = 100;
        }
      },
      decrease() {
        this.percent -= 10;
        if (this.percent < 0) {
          this.percent = 0;
        }
      }
    }
  }
</script>
```
:::

### Circular progress bar

:::demo You can specify `type` attribute to `circle` to use circular progress bar, and use `width` attribute to change the size of circle.
```html
<c-progress type="circle" :percentage="0"></c-progress>
<c-progress type="circle" :percentage="25"></c-progress>
<c-progress type="circle" :percentage="100" status="success"></c-progress>
<c-progress type="circle" :percentage="70" status="warning"></c-progress>
<c-progress type="circle" :percentage="50" status="exception"></c-progress>
```
:::

### Dashboard progress bar

You also can specify `type` attribute to `dashboard` to use dashboard progress bar.

:::demo

```html
<c-progress type="dashboard" :percentage="percent" :color="colors"></c-progress>
<div>
  <button-group>
    <c-button @click="decrease">+</c-button>
    <c-button @click="increase">-</c-button>
  </button-group>
</div>

<script>
  export default {
    data() {
      return {
        percent: 10,
        colors: [
          {color: '#f56c6c', percent: 20},
          {color: '#e6a23c', percent: 40},
          {color: '#5cb87a', percent: 60},
          {color: '#1989fa', percent: 80},
          {color: '#6f7ad3', percent: 100}
        ]
      };
    },
    methods: {
      increase() {
        this.percent += 10;
        if (this.percent > 100) {
          this.percent = 100;
        }
      },
      decrease() {
        this.percent -= 10;
        if (this.percent < 0) {
          this.percent = 0;
        }
      }
    }
  }
</script>
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
| --- | ---- | ---- | ---- | ---- |
| **percent** | percent, **required** | number | 0-100 | 0 |
| type | the type of progress bar | string | line/circle/dashboard | line |
| stroke-width | the width of progress bar | number | — | 6 |
| text-inside | whether to place the percent inside progress bar, only works when `type` is 'line' | boolean | — | false |
| status | the current status of progress bar | string | success/exception/warning | — |
| color  | background color of progress bar. Overrides `status` prop | string/function/array | — | '' |
| width | the canvas width of circle progress bar | number | — | 126 |
| show-text | whether to show percent | boolean | — | true |
| stroke-linecap  | circle/dashboard type shape at the end path | string | butt/round/square | round |