<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import ItemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'

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
  <m-waterfall
    class="w-full px-1"
    :data="pexelsList"
    nodeKey="id"
    :column="isMobileTerminal ? 2 : 5"
    :picturePreReading="true"
  >
    <template v-slot="{ item, width }">
      <ItemVue :data="item" />
    </template>
  </m-waterfall>
</template>

<style lang="scss" scoped></style>
