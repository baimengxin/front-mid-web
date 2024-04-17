<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import { useThemeStore } from '@/store'
import { computed } from 'vue'

// 构建渲染数据源
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

const store = useThemeStore()
// 主题色切换
const onItemClick = (theme) => {
  store.changeThemeTypeFn(theme.type)
}

// 控制图标展示
const svgIcon = computed(() => {
  // 根据当前的 themeType 返回当前的选中 icon
  const findTheme = themeArr.find((item) => item.type === store.themeType)

  return findTheme.icon
})
</script>

<template>
  <m-popover placement="left-bottom">
    <template #reference>
      <m-svg-icon
        :name="svgIcon"
        class="w-4 h-4 p-1 bg-white cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:bg-zinc-800 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1"></m-svg-icon>
        <div class="text-zinc-800 text-sm dark:text-zinc-300">
          {{ item.name }}
        </div>
      </div>
    </div>
  </m-popover>
</template>

<style lang="scss" scoped></style>
