<script>
// 延迟关闭时长
const DELAY_TIME = 100
// 左上
const PROP_LEFT_TOP = 'left-top'
// 右上
const PROP_RIGHT_TOP = 'right-top'
// 左下
const PROP_LEFT_BOTTOM = 'left-bottom'
// 右下
const PROP_RIGHT_BOTTOM = 'right-bottom'

// 定义指定位置的 Enum
const placementEnum = [
  PROP_LEFT_TOP,
  PROP_RIGHT_TOP,
  PROP_LEFT_BOTTOM,
  PROP_RIGHT_BOTTOM
]
</script>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  // 控制气泡弹出位置，并给出开发者错误的提示
  placement: {
    type: String,
    default: 'left-bottom',
    validator(val) {
      const result = placementEnum.includes(val)

      // 错误给出提示
      if (!result) {
        throw new Error(
          `你的 placement 必须是 ${placementEnum.join('、')} 中的一个`
        )
      }

      return result
    }
  }
})

// 弹出层状态
const isVisable = ref(false)

let timeout
/**
 * 鼠标移入的触发行为
 */
const onMouseenter = () => {
  isVisable.value = true
  // 再次触发，清理定时器
  if (timeout) {
    clearTimeout(timeout)
  }
}

/**
 * 鼠标移出的触发行为
 */
const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}

/**
 * 计算弹层位置
 */
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

// 气泡样式
const contentStyle = ref({
  top: 0,
  left: 0
})

/**
 * 监听展示的变化，在展示时计算气泡位置
 */
watch(isVisable, (val) => {
  if (!val) return

  // 等待 dom 渲染成功之后
  nextTick(() => {
    console.log(
      useElementSize(contentTarget.value),
      useElementSize(referenceTarget.value)
    )
    switch (props.placement) {
      // 左上 (top:0, left:-162)
      case PROP_LEFT_TOP:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break

      // 右上 (top:0, left:40)
      case PROP_RIGHT_TOP:
        contentStyle.value.top = 0
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break

      // 左下 (top:40, left:-162)
      case PROP_LEFT_BOTTOM:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break

      // 右下 (top:40, left:40)
      case PROP_RIGHT_BOTTOM:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<template>
  <div class="relative" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <div ref="referenceTarget">
      <!-- 具名插槽 -->
      <slot name="reference" />
    </div>

    <!-- 气泡展示动画 -->
    <Transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white border rounded-md"
        :style="contentStyle"
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
