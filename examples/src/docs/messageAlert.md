## MessageAlert

Displays important alert messages.

### Basic usage

MessageAlert components are non-overlay elements in the page that does not disappear automatically.

:::demo MessageAlert provides 4 types of themes defined by `type`, whose default value is `info`.

```html
<template>
<c-message-alert type="info"><a>link test</a>Content of prompt. Content of prompt. Content of prompt. Content of prompt.</c-message-alert>
<c-message-alert type="success">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</c-message-alert>
<c-message-alert type="warning">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</c-message-alert>
<c-message-alert type="error">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</c-message-alert>
</template>
```
:::