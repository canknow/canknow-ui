<template>
  <div class="c-battery-charge">
    <div class="c-battery-charge-container">
      <div class="c-battery-charge-number">{{ percent }}</div>
      <div class="c-battery-charge-contrast">
        <div class="c-battery-charge-circle"></div>
        <ul class="c-battery-charge-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CBatteryCharge',
  props: {
    percent: null
  }
};
</script>
