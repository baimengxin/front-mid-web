<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { confirm } from '@/libs'

const router = useRouter()
const store = useUserStore()

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

/**
 * 登录账户
 * */
const onToLogin = () => {
  router.push('/login')
}

/**
 * 退出登录
 * */
const onItemClick = (item) => {
  if (item.id === 2) {
    confirm('你确定要退出登录吗？').then(() => {
      store.logoutFn()
    })
    return
  }
  router.push(item.path)
}
</script>

<template>
  <m-popover>
    <template #reference>
      <div
        v-if="store.token"
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img v-lazy class="w-3 h-3 rounded-sm" :src="store.userInfo.avatar" />

        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>

        <!-- vip -->
        <m-svg-icon
          v-if="store.userInfo.vipLevel"
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip"
        ></m-svg-icon>
      </div>

      <div v-else>
        <m-button icon="profile" iconColor="#fff" @click="onToLogin"></m-button>
      </div>
    </template>

    <!-- 气泡 -->
    <div v-if="store.token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">
          {{ item.title }}
        </span>
      </div>
    </div>
  </m-popover>
</template>

<style lang="scss" scoped></style>
