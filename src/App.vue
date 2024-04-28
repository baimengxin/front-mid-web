<script setup>
import { useAppStore } from '@/store'

const store = useAppStore()
</script>

<template>
  <div class="h-screen fixed top-0 left-0 w-screen">
    <m-transition-router-view
      mainComponentName="home"
      :routerType="store.getRouterTypeFn"
    ></m-transition-router-view>
  </div>
</template>

<style scoped></style>
