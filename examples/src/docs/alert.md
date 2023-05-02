## Alert

Displays important alert messages.

### Basic usage

Alert components are non-overlay elements in the page that does not disappear automatically.

:::demo Alert provides 4 types of themes defined by `type`, whose default value is `info`.

```html
<template>
<c-alert :closable="true" scene="info"><a>link test</a>Content of prompt. Content of prompt. Content of prompt. Content of prompt.</c-alert>
<c-alert :closable="true" scene="success">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</c-alert>
<c-alert :closable="true" scene="warning">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</c-alert>
<c-alert :closable="true" scene="danger">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</c-alert>
</template>
```
:::