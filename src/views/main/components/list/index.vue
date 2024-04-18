<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import ItemVue from './item.vue'

let query = {
  page: 1,
  size: 20
}

const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
}
getPexelsData()
</script>

<template>
  <div class="">
    <ItemVue v-for="item in pexelsList" :key="item.id" :data="item" />
  </div>
</template>

<style lang="scss" scoped></style>
