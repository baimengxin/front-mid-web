<script setup>
import { ref } from 'vue'

// 弹出层状态
const isVisable = ref(false)
/**
 * 鼠标移入的触发行为
 */
const onMouseenter = () => {
  isVisable.value = true
}

/**
 * 鼠标移出的触发行为
 */
const onMouseleave = () => {
  isVisable.value = false
}
</script>

<template>
  <div class="relative" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <div>
      <!-- 具名插槽 -->
      <slot name="reference" />
    </div>

    <!-- 气泡展示动画 -->
    <Transition name="slide">
      <div
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white border rounded-md"
      >
        <!-- 匿名插槽 -->
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
// slide 展示动画
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
