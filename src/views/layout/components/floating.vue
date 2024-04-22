<script setup></script>

<template>
  <div class="fixed right-2 bottom-10">
    <!-- 引导 -->
    <div class="group floating">
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
      ></m-svg-icon>
    </div>

    <!-- 反馈 -->
    <m-popover class="">
      <template #reference>
        <div class="group floating">
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
