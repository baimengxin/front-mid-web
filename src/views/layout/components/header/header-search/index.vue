<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'

const inputValue = ref('')

// 搜索的回调事件
const onSearchHandler = (val) => {
  inputValue.value = val
}
</script>

<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <HintVue
            v-show="inputValue"
            :searchText="inputValue"
            @itemClick="onSearchHandler"
          />
        </div>
      </template>
    </m-search>
  </div>
</template>

<style lang="scss" scoped></style>
