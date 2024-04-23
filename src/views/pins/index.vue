<script setup>
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="fixed left-0 top-0 z-20 w-screen h-screen bg-slate-500 text-xl">
    {{ id }}
  </div>
</template>

<style lang="scss" scoped></style>
