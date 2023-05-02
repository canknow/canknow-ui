::: demo
```html
<template>
  <div class="demo-transition">
    <c-button @click="isVisible= !isVisible">查看效果</c-button>
    <div class="flex-horizontal component-span-top">
        <transition name="ease">
          <div v-show="isVisible" class="transition-box">ease</div>
        </transition>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
          return {
            isVisible: true
          }
        }
      }
</script>
```
:::

::: demo
```html
<template>
  <div class="demo-transition">
    <c-button @click="isVisible= !isVisible">查看效果</c-button>
    <div class="flex-horizontal component-span-top">
        <transition name="move-up">
          <div v-show="isVisible" class="transition-box">move-up</div>
        </transition>
        <transition name="move-down">
          <div v-show="isVisible" class="transition-box">move-down</div>
        </transition>
        <transition name="move-left">
          <div v-show="isVisible" class="transition-box">move-left</div>
        </transition>
        <transition name="move-right">
          <div v-show="isVisible" class="transition-box">move-right</div>
        </transition>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
          return {
            isVisible: true
          }
        }
      }
</script>
```
:::

::: demo
```html
<template>
  <div class="demo-transition">
    <c-button @click="isVisible= !isVisible">查看效果</c-button>
    <div class="flex-horizontal component-span-top">
        <transition name="slide-up">
          <div v-show="isVisible" class="transition-box">slide-up</div>
        </transition>
        <transition name="slide-down">
          <div v-show="isVisible" class="transition-box">slide-down</div>
        </transition>
        <transition name="slide-left">
          <div v-show="isVisible" class="transition-box">slide-left</div>
        </transition>
        <transition name="slide-right">
          <div v-show="isVisible" class="transition-box">slide-right</div>
        </transition>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
          return {
            isVisible: true
          }
        }
      }
</script>
```
:::