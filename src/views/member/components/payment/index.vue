<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import PcPaymentVue from './pc-payment/index.vue'
</script>

<template>
  <div>
    <!-- pc 端支付 -->
    <PcPaymentVue v-if="!isMobileTerminal" />
  </div>
</template>

<style lang="scss" scoped></style>
