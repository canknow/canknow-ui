
:::demo
```html
<template>
    <div>
         <c-descriptions title="User Info" bordered>
            <c-descriptions-item label="Product">Cloud Database</c-descriptions-item>
            <c-descriptions-item label="Billing Mode">Prepaid</c-descriptions-item>
            <c-descriptions-item label="Automatic Renewal">YES</c-descriptions-item>
            <c-descriptions-item label="Order time">2018-04-24 18:00:00</c-descriptions-item>
            <c-descriptions-item label="Usage Time" span="2">
              2019-04-24 18:00:00
            </c-descriptions-item>
            <c-descriptions-item label="Status" span="3">
              <c-badge status="processing" text="Running" />
            </c-descriptions-item>
            <c-descriptions-item label="Negotiated Amount">$80.00</c-descriptions-item>
            <c-descriptions-item label="Discount">$20.00</c-descriptions-item>
            <c-descriptions-item label="Official Receipts">$60.00</c-descriptions-item>
            <c-descriptions-item label="Config Info">
              Data disk type: MongoDB
              <br />
              Database version: 3.4
              <br />
              Package: dds.mongo.mid
              <br />
              Storage space: 10 GB
              <br />
              Replication factor: 3
              <br />
              Region: East China 1<br />
            </c-descriptions-item>
          </c-descriptions>
    </div>
</template>

<script>
    export default {
        name: 'DescriptionsDemo'
    }
</script>
```
:::

:::demo
```html
<template>
    <div>
         <descriptions title="User Info">
            <descriptions-item label="Product">Cloud Database</descriptions-item>
            <descriptions-item label="Billing Mode">Prepaid</descriptions-item>
            <descriptions-item label="Automatic Renewal">YES</descriptions-item>
            <descriptions-item label="Order time">2018-04-24 18:00:00</descriptions-item>
            <descriptions-item label="Usage Time" span="2">
              2019-04-24 18:00:00
            </descriptions-item>
            <descriptions-item label="Status" span="3">
              <badge status="processing" text="Running" />
            </descriptions-item>
            <descriptions-item label="Negotiated Amount">$80.00</descriptions-item>
            <descriptions-item label="Discount">$20.00</descriptions-item>
            <descriptions-item label="Official Receipts">$60.00</descriptions-item>
            <descriptions-item label="Config Info">
              Data disk type: MongoDB
              <br />
              Database version: 3.4
              <br />
              Package: dds.mongo.mid
              <br />
              Storage space: 10 GB
              <br />
              Replication factor: 3
              <br />
              Region: East China 1<br />
            </descriptions-item>
          </descriptions>
    </div>
</template>

<script>
    export default {
        name: 'DescriptionsDemo'
    }
</script>
```
:::