import { defineStore } from 'pinia'
import { ref } from 'vue'
import { THEME_LIGHT, THEME_DARK } from '@/constants'

export const useThemeStore = defineStore(
  'theme',
  () => {
    // 主题色模式
    const themeType = ref(THEME_LIGHT)

    // 切换主题色模式
    const changeThemeTypeFn = (newTheme) => {
      themeType.value = newTheme
    }

    return { themeType, changeThemeTypeFn }
  },
  {
    // 3. 开启默认持久化配置
    persist: true
  }
)
