<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>

<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <template #dropdown>
        <div>123</div>
      </template>
    </m-search>
  </div>
</template>

<style lang="scss" scoped></style>
