<script>
const EMITS_CLOSE = 'close'
</script>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMITS_CLOSE])

// 关闭的回调事件
const close = () => {
  emits(EMITS_CLOSE)
}

// 确定按钮的回调事件
const onConfirmClick = () => {}
</script>

<template>
  <div class="overflow-auto flex flex-col items-center">
    <!-- 移动端 ×号 -->
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img ref="imgTarget" :src="blob" />

    <m-button class="mt-4 w-[80%] xl:w-1/2" @click="onConfirmClick"
      >确定</m-button
    >
  </div>
</template>

<style lang="scss" scoped></style>
