<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'
import HistoryVue from './history.vue'
import ThemeVue from './theme.vue'
import { useSearchStore, useAppStore } from '@/store'

const store = useSearchStore()
const appStore = useAppStore()

const inputValue = ref('')

// 搜索的回调事件
const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    // 新增历史数据
    store.addHistoryFn(val)
    // 触发 搜索文本的变化
    appStore.changeSearchTextFn(val)
  }
}
</script>

<template>
  <div class="w-full">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <HintVue
            v-show="inputValue"
            :searchText="inputValue"
            @itemClick="onSearchHandler"
          />

          <!-- 最近搜索 -->
          <HistoryVue v-show="!inputValue" @itemClick="onSearchHandler" />

          <!-- 主题推荐 -->
          <ThemeVue v-show="!inputValue" />
        </div>
      </template>
    </m-search>
  </div>
</template>

<style lang="scss" scoped></style>
