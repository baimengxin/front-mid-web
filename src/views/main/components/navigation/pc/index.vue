<script setup>
import { useCategoryStore } from '@/store'
import { ref } from 'vue'

const store = useCategoryStore()

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
const currentCategoryIndex = ref(0)
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}
</script>

<template>
  <div class="sticky top-0 left-0 z-10 w-full bg-white">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="{ 'h-[56px]': isOpenCategoty === false }"
    >
      <!-- 箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
        @click="triggerState"
      >
        <m-svg-icon
          class="w-1 h-1"
          :name="isOpenCategoty ? 'fold' : 'unfold'"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
      </div>
      <li
        class="shrink-0 p-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
        v-for="(item, index) in store.categoryData"
        :key="item.id"
        :class="{
          'text-zinc-900 bg-zinc-200 ': currentCategoryIndex === index
        }"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
