<script setup>
import headerSearchVue from './header-search/index.vue'
import headerThemeVue from './header-theme.vue'
import headerMyVue from './header-my.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>

<template>
  <div
    class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800 dark:border-b-zinc-700 duration-500"
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="guide-home h-4 cursor-pointer mr-2"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
      />
      <headerSearchVue class="mr-1 guide-search" />
      <headerThemeVue class="mr-1 guide-theme" />
      <headerMyVue class="guide-my" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
