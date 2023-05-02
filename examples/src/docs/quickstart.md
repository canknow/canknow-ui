## Quick start

This part walks you through the process of using canknow-ui in a webpack project.

### Import canknow-ui

You can import canknow-ui entirely, or just import what you need. Let's start with fully import.

#### Fully import

In main.js:

```javascript
import Vue from 'vue';
import canknow from 'canknow-ui';
import 'canknow-ui/dist/canknow-ui.css';
import App from './App.vue';

Vue.use(canknow);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

The above imports canknow-ui entirely. Note that CSS file needs to be imported separately.

#### On demand

With the help of [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component), we can import components we actually need, making the project smaller than otherwise.

First, install babel-plugin-component:

```bash
npm install babel-plugin-component -D
```

Then edit .babelrc:

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "canknow-ui",
        "styleLibraryName": "scss"
      }
    ]
  ]
}
```

Next, if you need Button and Select, edit main.js:

```javascript
import Vue from 'vue';
import { Button, Select } from 'canknow-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

/* or
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

Full example (Component list reference [components.json](https://github.com/canknow/canknow/src/components.json))
