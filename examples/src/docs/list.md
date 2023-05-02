:::demo
```html
<template>
  <c-list item-layout="horizontal" :data-source="data">
    <c-list-item slot="renderItem" slot-scope="{ item, index }">
      <c-list-item-meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team">
        <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
        <c-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
      </c-list-item-meta>
    </c-list-item>
  </c-list>
</template>
<script>
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
export default {
  data() {
    return {
      data,
    };
  },
};
</script>
```
:::

:::demo
```html
<template>
  <list :grid="{ gutter: 1, column: 4 }" :data-source="data">
    <list-item slot="renderItem" slot-scope="{ item, index }">
      <c-card :title="item.title">
        Card content
      </c-card>
    </list-item>
  </list>
</template>
<script>
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];
export default {
  data() {
    return {
      data,
    };
  },
};
</script>
```
:::

:::demo
```html
<template>
  <list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <list-item slot="renderItem" slot-scope="{ item, index }">
      <template slot="actions">
        <li :key="type" v-for="{ type, text } in actions">
          <icon :name="type" style="margin-right: 6px;" />
          {{ text }}
        </li>
      </template>
      <img
        slot="extra"
        width="272"
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>
      <list-item-meta :description="item.description">
        <a slot="title" :href="item.href">{{ item.title }}</a>
        <avatar slot="avatar" :src="item.avatar" />
      </list-item-meta>
      {{ item.content }}
    </list-item>
  </list>
</template>
<script>
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

export default {
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      },
      actions: [
        { type: 'remind', text: '156' },
        { type: 'like', text: '156' },
        { type: 'message', text: '2' },
      ],
    };
  },
};
</script>
```
:::