### Update SCSS variables in your project
css is written in SCSS. If your project also uses SCSS, you can directly change canknow style variables. Create a new style file, e.g. `variables.scss`:

```html
/* theme color */
$primary-color: teal;

/* $resource root path, required */
$resourceRoot: "~canknow/src";

@import "~canknow/src/scss/index";
```

Then in the entry file of your project, import this style file instead of Element's built CSS:
```JS
import Vue from 'vue';
import canknow from 'canknow';
import './custom-variables.scss';

Vue.use(canknow);
```