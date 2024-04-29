<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import PcPaymentVue from './pc-payment/index.vue'
import MobilePaymentVue from './mobile-payment/index.vue'
</script>

<template>
  <div>
    <!-- pc 端支付 -->
    <PcPaymentVue v-if="!isMobileTerminal" />

    <!-- 移动端支付 -->
    <MobilePaymentVue v-else />
  </div>
</template>

<style lang="scss" scoped></style>
