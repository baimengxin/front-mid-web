<script setup>
import { ref, watch } from 'vue'
import { getPexelsList } from '@/api/pexels'
import ItemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useAppStore } from '@/store'

const store = useAppStore()

let query = {
  page: 1,
  size: 100
}

// 数据是否在加载中
const isLoading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)
// 数据源
const pexelsList = ref([])
const getPexelsData = async () => {
  // 数据全部加载完成 则 return
  if (isFinished.value) return

  // 完成第一次请求之后，后续让 page 自增
  if (pexelsList.value.length) {
    query.page += 1
  }

  // 触发接口请求
  const res = await getPexelsList(query)

  // 初始请求清空数据源
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }

  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }

  // 修改 loading 标记
  isLoading.value = false
}

/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  pexelsList.value = []
}

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => store.currentCategory,
  (currentCategory) => {
    // 重置请求参数，categoryId 默认为 all
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)

/**
 * 监听 searchText 搜索文本的变化
 */
watch(
  () => store.searchText,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)

/**
 * 进入 pins
 */
const onToPins = (item) => {
  console.log(item)
  history.pushState(null, null, `/pins/${item.id}`)
}
</script>

<template>
  <m-infinite
    v-model="isLoading"
    :isFinished="isFinished"
    @onLoad="getPexelsData"
  >
    <m-waterfall
      class="w-full px-1"
      :data="pexelsList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <ItemVue :data="item" :width="width" @onDetails="onToPins" />
      </template>
    </m-waterfall>
  </m-infinite>
</template>

<style lang="scss" scoped></style>
