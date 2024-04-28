<script setup>
import Navigation from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useUserStore, useAppStore } from '@/store'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { onActivated, ref } from 'vue'

const store = useUserStore()
const router = useRouter()
const appStore = useAppStore()

// 记录页面滚动的位置
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)
// 被缓存的组件再次可见，会回调 onActivated 方法
onActivated(() => {
  if (!containerTarget.value) return

  containerTarget.value.scrollTop = containerTargetScrollY.value
})

// vip跳转
const onVipClick = () => {
  appStore.changeRouterTypeFn('push')
  router.push('/member')
}

// 我的跳转
const onMyClick = () => {
  // 配置跳转方式
  appStore.changeRouterTypeFn('push')
  if (store.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scroll-class"
    ref="containerTarget"
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
