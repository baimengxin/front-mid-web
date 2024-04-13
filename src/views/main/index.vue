<script setup>
import Navigation from './components/navigation/index.vue'
import { getCategory } from '@/api/category'

const getCategoryData = async () => {
  const res = await getCategory()
  console.log(res)
}
getCategoryData()
</script>

<template>
  <div class="">
    <Navigation />
  </div>
</template>

<style lang="scss" scoped></style>
