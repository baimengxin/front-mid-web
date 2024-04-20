<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'
import HistoryVue from './history.vue'
import ThemeVue from './theme.vue'
import { useSearchStore } from '@/store'

const store = useSearchStore()

const inputValue = ref('')

// 搜索的回调事件
const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    store.addHistoryFn(val)
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
