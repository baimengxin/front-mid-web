<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>

<script setup>
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMITS_ITEM_CLICK])

// 搜索数据
const hintData = ref([])
// 请求搜索接口
const getHintData = async () => {
  if (!props.searchText) return

  const { result } = await getHint(props.searchText)
  hintData.value = result
}

// 监听 搜索文本的变化，并获取对应的数据
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  // 每次事件触发时，延迟的时间
  debounce: 500
})

// item 点击事件
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}

/**
 * 处理关键字高亮
 * */
const highlightText = (text) => {
  // 生成高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // 搜索关键字的正则
  const reg = new RegExp(props.searchText, 'gi')

  return text.replace(reg, highlightStr)
}
</script>

<template>
  <div class="">
    <div
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-for="(item, index) in hintData"
      :key="index"
      v-html="highlightText(item)"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>

<style lang="scss" scoped></style>
