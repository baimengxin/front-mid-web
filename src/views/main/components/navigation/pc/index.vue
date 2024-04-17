<script setup>
import { useCategoryStore } from '@/store'

const store = useCategoryStore()
</script>

<template>
  <div class="sticky top-0 left-0 z-10 w-full bg-white">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
    >
      <!-- 箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
      >
        <m-svg-icon
          class="w-1 h-1"
          name="unfold"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
      </div>
      <li
        class="shrink-0 p-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
        v-for="item in store.categoryData"
        :key="item.id"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
