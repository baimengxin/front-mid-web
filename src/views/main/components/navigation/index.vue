<script setup>
import MobileVue from './mobile/index.vue'
import PcVue from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { ref } from 'vue'
import { getCategory } from '@/api/category'

const categoryData = ref([])
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = categorys
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
