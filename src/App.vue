<script setup>
import { isMobileTerminal } from '@/utils/flexible'
</script>

<template>
  <div class="bg-red-900 font-bold">{{ isMobileTerminal }}</div>
</template>

<style scoped>

</style>
