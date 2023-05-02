<script>
  const varMap = {
    '$--box-shadow-light': 'boxShadowLight',
    '$--box-shadow-base': 'boxShadowBase',
    '$--border-radius-base': 'borderRadiusBase',
    '$--border-radius-small': 'borderRadiusSmall'
  };
  const original = {
    boxShadowLight: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    boxShadowBase: '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)',
    borderRadiusBase: '4px',
    borderRadiusSmall: '2px'
  };
  export default {
    data() {
      return {
        global: {},
        boxShadowLight: '',
        boxShadowBase: '',
        borderRadiusBase: '',
        borderRadiusSmall: ''
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          Object.keys(varMap).forEach((c) => {
            if (value[c]) {
              this[varMap[c]] = value[c]
            } else {
              this[varMap[c]] = original[varMap[c]]
            }
          });
        }
      }
    }
  }
</script>

## Border

We standardize the borders that can be used in buttons, cards, pop-ups and other components.

### Border

There are few border styles to choose.

<table class="demo-border">
  <tbody>
    <tr>
      <td class="text">Name</td>
      <td class="text">Class</td>
      <td class="line">Demo</td>
    </tr>
    <tr>
      <td class="text">Solid</td>
      <td class="text">border-bottom</td>
      <td class="line">
        <div class="border-bottom"></div>
      </td>
    </tr>
    <tr>
      <td class="text">Dashed</td>
      <td class="text">border-bottom-dashed</td>
      <td class="line">
        <div class="border-bottom-dashed"></div>
      </td>
    </tr>
  </tbody>
</table>

### Radius

There are few radius styles to choose.

<c-row :gutter="1" class="demo-radius">
  <c-column :span="6" :xs="{span: 12}">
    <div class="title">No Radius</div>
    <div class="value">border-radius: 0px</div>
    <div class="radius"></div>
  </c-column>
  <c-column :span="6" :xs="{span: 12}">
    <div class="title">Small Radius</div>
    <div class="value">border-radius: {{borderRadiusSmall}}</div>
    <div 
      class="radius" 
      :style="{ borderRadius: borderRadiusSmall }"
    ></div>
  </c-column>
  <c-column :span="6" :xs="{span: 12}">
    <div class="title">Large Radius</div>
    <div class="value">border-radius: {{borderRadiusBase}}</div>
    <div 
      class="radius"
      :style="{ borderRadius: borderRadiusBase }"
    ></div>
  </c-column>
  <c-column :span="6" :xs="{span: 12}">
    <div class="title">Round Radius</div>
    <div class="value">border-radius: 30px</div>
    <div class="radius radius-30"></div>
  </c-column>
</c-row>
