<script setup>
import { useCategoryStore, useAppStore } from '@/store'
import { ref } from 'vue'

const store = useCategoryStore()
const appStore = useAppStore()

/**
 * 状态切换处理
 */
const isOpenCategoty = ref(false)
const triggerState = () => {
  isOpenCategoty.value = !isOpenCategoty.value
}

/**
 * 选中状态处理
 */

const onItemClick = (item) => {
  appStore.changeCurrentCategoryFn(item)
  // currentCategoryIndex.value = index
}
</script>

<template>
  <div
    class="sticky top-0 left-0 z-10 w-full bg-white dark:bg-zinc-800 duration-500"
  >
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="{ 'h-[56px]': isOpenCategoty === false }"
    >
      <!-- 箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <m-svg-icon
          class="w-1 h-1"
          :name="isOpenCategoty ? 'fold' : 'unfold'"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </div>
      <li
        class="shrink-0 p-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-900"
        v-for="(item, index) in store.categoryData"
        :key="item.id"
        :class="{
          'text-zinc-900 bg-zinc-200 dark:text-zinc-300  dark:bg-zinc-900 ':
            appStore.currentCategoryIndex === index
        }"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
