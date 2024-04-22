<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import steps from './steps'

const driverObj = driver({
  // 显示游览的进度
  showProgress: true,
  // 显示按钮 控制上一步，下一步
  //   showButtons: [i18n.t('msg.guide.prev'), 'previous'],
  doneBtnText: '结束退出',
  nextBtnText: '下一步',
  prevBtnText: '上一步',
  steps: steps,
  // 退出的回调
  onDestroyStarted: () => {
    driverObj.destroy()
  }
})

/**
 * 引导点击事件
 * */
const onGuideClick = () => {
  driverObj.drive()
}
</script>

<template>
  <div class="fixed right-2 bottom-10">
    <!-- 引导 -->
    <div class="guide-start group floating">
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
        @click="onGuideClick"
      ></m-svg-icon>
    </div>

    <!-- 反馈 -->
    <m-popover class="">
      <template #reference>
        <div class="guide-feedback group floating">
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
          ></m-svg-icon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>

          <span class="text-sm text-zinc-800 dark:text-zinc-300">立即吐槽</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<style lang="scss" scoped></style>
