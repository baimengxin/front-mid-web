<script setup>
import MobileVue from './mobile/index.vue'
import PcVue from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useCategoryStore } from '@/store'

const store = useCategoryStore()
store.loadCategoryFn()
</script>

<template>
  <MobileVue v-if="isMobileTerminal" />
  <PcVue v-else />
</template>

<style lang="scss" scoped></style>
