## Message box

:::demo
```html
<template>
  <c-button type="text" @click="open">点击打开 Message Box</c-button>
</template>

<script>
  export default {
    methods: {
      open() {
        const h = this.$createElement;
        this.$MessageBox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$Message.info('action: ' + action);
        });
      }
    }
  }
</script>
```
:::

:::demo
```html
<template>
  <c-button type="text" @click="open">点击打开 Message Box</c-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息').then(() => {
            this.$Message.info('保存修改');
          }).catch(action => {
            this.$Message.info(action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面')
          });
      }
    }
  }
</script>
```
:::
