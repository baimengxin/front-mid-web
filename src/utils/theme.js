import { useThemeStore } from '@/store'
import { watch } from 'vue'
import { THEME_LIGHT, THEME_DARK } from '@/constants'

/**
 * 初始化主题
 */
export default () => {
  const store = useThemeStore()
  watch(
    () => store.themeType,
    (val) => {
      let themeClassName = ''

      switch (val) {
        case THEME_LIGHT:
          themeClassName = 'light'
          break
        case THEME_DARK:
          themeClassName = 'dark'
          break
      }

      // 修改类名
      document.querySelector('html').className = themeClassName
    },
    {
      // 初始执行一次
      immediate: true
    }
  )
}
