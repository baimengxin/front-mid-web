<script setup>
import MobileVue from './mobile/index.vue'
import PcVue from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { ref } from 'vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categoryData = ref([])
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = categorys
  categoryData.value.unshift(ALL_CATEGORY_ITEM)
}
getCategoryData()
</script>

<template>
  <div class="">
    <MobileVue v-if="isMobileTerminal" :data="categoryData" />
    <PcVue v-else />
  </div>
</template>

<style lang="scss" scoped></style>
