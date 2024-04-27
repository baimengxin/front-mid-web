<script setup>
import Navigation from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useUserStore } from '@/store'

const store = useUserStore()

const onVipClick = () => {}

const onMyClick = () => {}
</script>

<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scroll-class"
  >
    <Navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <ListVue />
    </div>

    <m-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <m-trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
      >
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="store.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ store.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<style lang="scss" scoped></style>
