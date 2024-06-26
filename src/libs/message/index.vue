<script>
const success = 'success'
const warn = 'warn'
const error = 'error'

const typeEnum = [success, warn, error]
</script>

<script setup>
import { onMounted, ref } from 'vue'
import mSvgIcon from '../svg-icon/index.vue'

const props = defineProps({
  // 消息类型
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        return new Error(`你的 type 必须是 ${typeEnum.join('、')} 中的一个`)
      }

      return result
    }
  },
  // 描述文本
  content: {
    type: String,
    required: true
  },
  /**
   * 展示时长
   */
  duration: {
    type: Number
  },
  /**
   * 关闭时的回调
   */
  destroy: {
    type: Function
  }
})

// 样式表
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}

// 控制显示隐藏
const isVisable = ref(false)
/**
 * 保证动画展示，需要在 mounted 之后进行展示
 */
onMounted(() => {
  isVisable.value = true
  /**
   * 延迟时间关闭
   */
  setTimeout(() => {
    isVisable.value = false
  }, props.duration)
})
</script>

<template>
  <!-- after-leave  在离开过渡完成、且元素已从 DOM 中移除时调用 -->
  <Transition name="down" @after-leave="destroy">
    <div
      v-show="isVisable"
      class="min-w-[280px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <!-- icon -->
      <m-svg-icon
        class="h-1.5 w-1.5 mr-1.5"
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
      ></m-svg-icon>
      <!-- 文本 -->
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
